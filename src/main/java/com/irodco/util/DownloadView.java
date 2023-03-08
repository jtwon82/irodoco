package com.irodco.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

public class DownloadView extends AbstractView {
	
	// http://winmargo.tistory.com/103
	// 이거 아직 동작안한다.

	private static final Logger logger = LoggerFactory.getLogger(DownloadView.class);
	
    public void Download(){
        setContentType("application/download; utf-8");
    }
    
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
        File file = (File)model.get("downloadFile");
        logger.debug("DownloadView --> file.getPath() : " + file.getPath());
        logger.debug("DownloadView --> file.getName() : " + file.getName());
        
        response.setContentType(getContentType());
        response.setContentLength((int)file.length());

        String userAgent = request.getHeader("User-Agent");
        boolean ie = userAgent.indexOf("MSIE") > -1;
        String fileName = null;

        if( ie ){
            fileName = URLEncoder.encode(file.getName(), "utf-8");
        } else {
            fileName = new String(file.getName().getBytes("utf-8"));
        }

        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
        response.setHeader("Content-Transfer-Encoding", "binary");
        OutputStream out = response.getOutputStream();
        FileInputStream fis = null;

        try {
            fis = new FileInputStream(file);
            FileCopyUtils.copy(fis, out);
        } catch(Exception e){
            logger.error("56 {}", e);
        }finally{
            if(fis != null){
                try{
                    fis.close();
                }catch(IOException e){
                	logger.error("62 {}", e);
                }
            }
        }

        out.flush();
    }

}