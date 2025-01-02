package com.shark.springbootstudentsmanagsys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(
    basePackages = "com.shark.springbootstudentsmanagsys",
    excludeFilters = {
        @ComponentScan.Filter(
            type = FilterType.REGEX,
            pattern = "com.shark.springbootstudentsmanagsys.common.GlobalExceptionHandler"
        )
    }
)
@EntityScan("com.shark.springbootstudentsmanagsys.entity")
@EnableJpaRepositories("com.shark.springbootstudentsmanagsys.repository")
public class SpringbootStudentsManagSysApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootStudentsManagSysApplication.class, args);
    }

}
