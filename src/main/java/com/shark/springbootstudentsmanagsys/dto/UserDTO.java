package com.shark.springbootstudentsmanagsys.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    
    @NotBlank(message = "用户名不能为空")
    private String username;
    
    private String password;
    
    private String name;
    
    @Email(message = "邮箱格式不正确")
    private String email;
    
    private Boolean isAdmin;
} 