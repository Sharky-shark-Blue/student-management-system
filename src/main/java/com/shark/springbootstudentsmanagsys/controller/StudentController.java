package com.shark.springbootstudentsmanagsys.controller;

import com.shark.springbootstudentsmanagsys.common.Result;
import com.shark.springbootstudentsmanagsys.dto.StudentDTO;
import com.shark.springbootstudentsmanagsys.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public Result<Page<StudentDTO>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return Result.success(studentService.findAll(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public Result<StudentDTO> getById(@PathVariable Long id) {
        return Result.success(studentService.findById(id));
    }

    @PostMapping
    public Result<StudentDTO> create(@Valid @RequestBody StudentDTO studentDTO) {
        return Result.success(studentService.create(studentDTO));
    }

    @PutMapping("/{id}")
    public Result<StudentDTO> update(@PathVariable Long id, @Valid @RequestBody StudentDTO studentDTO) {
        return Result.success(studentService.update(id, studentDTO));
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        studentService.delete(id);
        return Result.success(null);
    }
} 