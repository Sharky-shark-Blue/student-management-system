package com.shark.springbootstudentsmanagsys.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shark.springbootstudentsmanagsys.common.Result;
import com.shark.springbootstudentsmanagsys.dto.LoginRequest;
import com.shark.springbootstudentsmanagsys.dto.LoginResponse;
import com.shark.springbootstudentsmanagsys.dto.RegisterRequest;
import com.shark.springbootstudentsmanagsys.dto.UserDTO;
import com.shark.springbootstudentsmanagsys.security.JwtTokenProvider;
import com.shark.springbootstudentsmanagsys.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    //登录接口
    @PostMapping("/login")
    public Result<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        UserDTO user = userService.findByUsername(loginRequest.getUsername());

        return Result.success(new LoginResponse(jwt, user));
    }

    //获取当前用户信息
    @GetMapping("/profile")
    public Result<UserDTO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return Result.success(userService.findByUsername(username));
    }

    //注册接口
    @PostMapping("/register")
    public Result<UserDTO> register(@Valid @RequestBody RegisterRequest registerRequest) {
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(registerRequest, userDTO);
        userDTO.setIsAdmin(registerRequest.getIsAdmin() != null ? registerRequest.getIsAdmin() : false);
        return Result.success(userService.create(userDTO));
    }
} 