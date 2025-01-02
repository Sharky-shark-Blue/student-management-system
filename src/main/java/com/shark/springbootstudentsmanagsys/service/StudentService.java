package com.shark.springbootstudentsmanagsys.service;

import com.shark.springbootstudentsmanagsys.dto.StudentDTO;
import com.shark.springbootstudentsmanagsys.entity.Student;
import com.shark.springbootstudentsmanagsys.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public Page<StudentDTO> findAll(Pageable pageable) {
        return studentRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    public StudentDTO findById(Long id) {
        return studentRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + id));
    }

    @Transactional
    public StudentDTO create(StudentDTO studentDTO) {
        if (studentRepository.existsByStudentNumber(studentDTO.getStudentNumber())) {
            throw new IllegalArgumentException("Student number already exists");
        }
        Student student = new Student();
        BeanUtils.copyProperties(studentDTO, student);
        return convertToDTO(studentRepository.save(student));
    }

    @Transactional
    public StudentDTO update(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + id));
        
        if (!student.getStudentNumber().equals(studentDTO.getStudentNumber()) && 
            studentRepository.existsByStudentNumber(studentDTO.getStudentNumber())) {
            throw new IllegalArgumentException("Student number already exists");
        }
        
        BeanUtils.copyProperties(studentDTO, student, "id");
        return convertToDTO(studentRepository.save(student));
    }

    @Transactional
    public void delete(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new EntityNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    private StudentDTO convertToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        BeanUtils.copyProperties(student, dto);
        return dto;
    }
} 