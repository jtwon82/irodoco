package com.irodco.task;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.irodco.web.services.StatisticService;

public class Task1 implements Tasklet{
	private static final Logger logger = LoggerFactory.getLogger(Task1.class);

	@Value("#{config['server.name']}")
	private String appname;
	
	@Autowired
	StatisticService statisticService;
	
	@Override
	public RepeatStatus execute(StepContribution arg0, ChunkContext arg1)  {
		
		try{
			Map<String, String> param = new HashMap<String, String>();
			param.put("SERVER_NAME", appname);

			logger.debug("Task1 {}", param);
			statisticService.updateIsLiveApp(param);
			
		}catch(NullPointerException e){
			logger.error("37 err {}",e);
		}
		
        return RepeatStatus.FINISHED;
	}
}
