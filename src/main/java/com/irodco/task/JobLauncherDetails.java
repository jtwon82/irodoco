package com.irodco.task;

import java.util.Date;
import java.util.Map;
import java.util.Map.Entry;

import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.configuration.JobLocator;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.NoSuchJobException;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.irodco.web.controller.HomeController;

public class JobLauncherDetails extends QuartzJobBean {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    static final String JOB_NAME = "jobName";

    private JobLocator jobLocator;

    private JobLauncher jobLauncher;

    public void setJobLocator( JobLocator jobLocator ) {
        this.jobLocator = jobLocator;
    }

    public void setJobLauncher( JobLauncher jobLauncher ) {
        this.jobLauncher = jobLauncher;
    }

    @SuppressWarnings( "unchecked" )
    protected void executeInternal( JobExecutionContext context ) {

        Map<String, Object> jobDataMap = context.getMergedJobDataMap();

        String jobName = (String) jobDataMap.get( JOB_NAME );

        JobParameters jobParameters = getJobParametersFromJobMap( jobDataMap );

        try {
            try {
				jobLauncher.run( jobLocator.getJob( jobName ), jobParameters );
			} catch (JobExecutionAlreadyRunningException e) {
				logger.error("JobLauncher err {}", e);
			} catch (JobRestartException e) {
				logger.error("JobLauncher err {}", e);
			} catch (JobInstanceAlreadyCompleteException e) {
				logger.error("JobLauncher err {}", e);
			} catch (JobParametersInvalidException e) {
				logger.error("JobLauncher err {}", e);
			} catch (NoSuchJobException e) {
				logger.error("JobLauncher err {}", e);
			}
        }
        catch ( NullPointerException e ) {
        	logger.error("JobLauncher err {}", e);
        }
    }

    private JobParameters getJobParametersFromJobMap( Map<String, Object> jobDataMap ) {

        JobParametersBuilder builder = new JobParametersBuilder();

        for ( Entry<String, Object> entry : jobDataMap.entrySet() ) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if ( value instanceof String && !key.equals( JOB_NAME ) ) {
                builder.addString( key, (String) value );
            }
            else if ( value instanceof Float || value instanceof Double ) {
                builder.addDouble( key, ( (Number) value ).doubleValue() );
            }
            else if ( value instanceof Integer || value instanceof Long ) {
                builder.addLong( key, ( (Number) value ).longValue() );
            }
            else if ( value instanceof Date ) {
                builder.addDate( key, (Date) value );
            }
            else {
                builder.addString( key, "" + value );
            }
        }

        builder.addString( "timestamp", new JobParameter( new Date().getTime() ).toString() );

        return builder.toJobParameters();

    }

}