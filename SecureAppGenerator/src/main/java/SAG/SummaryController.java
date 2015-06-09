/*

Martus(TM) is a trademark of Beneficent Technology, Inc. 
This software is (c) Copyright 2015, Beneficent Technology, Inc.

Martus is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either
version 2 of the License, or (at your option) any later
version with the additions and exceptions described in the
accompanying Martus license file entitled "license.txt".

It is distributed WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, including warranties of fitness of purpose or
merchantability.  See the accompanying Martus License and
GPL license for more details on the required license terms
for this software.

You should have received a copy of the GNU General Public
License along with this program; if not, write to the Free
Software Foundation, Inc., 59 Temple Place - Suite 330,
Boston, MA 02111-1307, USA.

*/

package SAG;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Controller
public class SummaryController extends WebMvcConfigurerAdapter
{
	
	private static final String APK_LOCAL_FILE_DIRECTORY = "/build/outputs/apk/";
	private static String ORIGINAL_BUILD_DIRECTORY = "/Users/charlesl/EclipseMartus/martus-android/secure-app-vital-voices"; 
	private static String MAIN_BUILD_DIRECTORY = "/Users/charlesl/SAG/Build";
	private static String APK_DOWNLOADS_DIRECTORY = "/Users/charlesl/SAG/Downloads/";
	@RequestMapping(value=WebPage.SUMMARY, method=RequestMethod.GET)
    public String directError(HttpSession session, Model model) 
    {
		SecureAppGeneratorApplication.setInvalidResults(session);
        return WebPage.ERROR;
    }

	@RequestMapping(value=WebPage.SUMMARY_PREVIOUS, method=RequestMethod.POST)
    public String goBack(HttpSession session, Model model, AppConfiguration appConfig) 
    {
		model.addAttribute(SessionAttributes.APP_CONFIG, appConfig);
       return WebPage.OBTAIN_CLIENT_TOKEN;
    }
	
	@RequestMapping(value=WebPage.SUMMARY_NEXT, method=RequestMethod.POST)	
	public String buildApk(HttpSession session, Model model, AppConfiguration appConfig) 
    {
		try
		{
			File baseBuildDir = getSessionBuildDirectory();
			copyDefaultBuildFilesToStagingArea(baseBuildDir);
			AppConfiguration config = (AppConfiguration)session.getAttribute(SessionAttributes.APP_CONFIG);
			File apkCreated = buildApk(baseBuildDir, config.getApkName());
			copyApkToDownloads(session, apkCreated);
			FileUtils.deleteDirectory(baseBuildDir);			
		}
		catch (IOException e)
		{
			appConfig.setApkBuildError("Error: Unable to generate APK.");
			model.addAttribute(SessionAttributes.APP_CONFIG, appConfig);
			e.printStackTrace();
			return WebPage.SUMMARY;
		}
		
		model.addAttribute(SessionAttributes.APP_CONFIG, appConfig);
		return WebPage.FINAL;
    }

	private File buildApk(File baseBuildDir, String apkFileName) throws IOException
	{
		String baseDir = baseBuildDir.getAbsolutePath();
		String tempApkBuildFileDirectory = baseDir + APK_LOCAL_FILE_DIRECTORY;
		File appFileCreated = new File(tempApkBuildFileDirectory, apkFileName);
		appFileCreated.createNewFile();
		return appFileCreated;
	}

	public void copyApkToDownloads(HttpSession session, File apkFileToMove) throws IOException
	{
		Path source = apkFileToMove.toPath();
		String finalApkBuildFile = APK_DOWNLOADS_DIRECTORY + apkFileToMove.getName();
		Path target = new File(finalApkBuildFile).toPath();
		Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);

		AppConfiguration config = (AppConfiguration)session.getAttribute(SessionAttributes.APP_CONFIG);
		config.setApkLink(finalApkBuildFile);
		session.setAttribute(SessionAttributes.APP_CONFIG, config);
	}
	
	private void copyDefaultBuildFilesToStagingArea(File baseBuildDir) throws IOException
	{
		File source = new File(ORIGINAL_BUILD_DIRECTORY);
		//TODO we may want to invoke OS level call to do this instead.
		SagFileUtils.copy(source, baseBuildDir);
	}

	public File getSessionBuildDirectory() throws IOException
	{
		String tempBuildDirName = getRandomDirectoryFileName();
		File baseBuildDir = new File(MAIN_BUILD_DIRECTORY, tempBuildDirName);
		if(!baseBuildDir.mkdirs())
			throw new IOException("Unable to create directories:" + baseBuildDir.getAbsolutePath());
		File downloadsDirectory = new File(APK_DOWNLOADS_DIRECTORY);
		if(!downloadsDirectory.exists())
			if(!downloadsDirectory.mkdir())
				throw new IOException("Unable to create downloads directory:" + downloadsDirectory.getAbsolutePath());
		return baseBuildDir;
	}
	
	public static String getRandomDirectoryFileName() throws IOException
		{
		    final File temp;
		    temp = File.createTempFile("build", Long.toString(System.nanoTime()));
		    temp.delete();
		    return temp.getName();
		}
	
}