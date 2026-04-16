package com.project.course.service;

import com.project.course.entity.Course;
import com.project.course.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    public Course addCourse(Course c) {
        return repo.save(c);
    }

    public void deleteCourse(Long id) {
        repo.deleteById(id);
    }

    public Course updateCourse(Long id, Course c) {
        c.setId(id);
        return repo.save(c);
    }
}