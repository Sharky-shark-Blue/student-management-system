package com.shark.springbootstudentsmanagsys.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shark.springbootstudentsmanagsys.common.Result;
import com.shark.springbootstudentsmanagsys.dto.UserDTO;
import com.shark.springbootstudentsmanagsys.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // 获取用户列表
    @GetMapping
    public Result<List<UserDTO>> list() {
        return Result.success(userService.findAll());
    }

    // 根据ID获取用户
    @GetMapping("/{id}")
    public Result<UserDTO> getById(@PathVariable Long id) {
        return Result.success(userService.findById(id));
    }

    // 创建用户
    @PostMapping
    public Result<UserDTO> create(@Valid @RequestBody UserDTO userDTO) {
        return Result.success(userService.create(userDTO));
    }

    // 更新用户
    @PutMapping("/{id}")
    public Result<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        return Result.success(userService.update(id, userDTO));
    }

    // 删除用户
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return Result.success(null);
    }
} 