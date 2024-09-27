import { Router } from "express";
import CourseController from "../controllers/course.controller";

class CourseRoute {
    public router: Router;
    public coursecontroller: CourseController;
    constructor() {
        this.router = Router();
        this.coursecontroller = new CourseController();
        this.routes();
    }

    routes() {
        this.router.get("", this.coursecontroller.getAllCourses);
        this.router.get("/:courseId", this.coursecontroller.getCourseById);
        this.router.post("", this.coursecontroller.createCourse);
        this.router.put("/:courseId", this.coursecontroller.updateCourse);
        this.router.delete("/:courseId", this.coursecontroller.deleteCourse);
        this.router.get("/:courseId/batches", this.coursecontroller.getCourseBathes);
        this.router.post("/:courseId/batches", this.coursecontroller.addCourseBatch);
        this.router.delete("/:courseId/batches/:batchId", this.coursecontroller.deleteCourseBatch);
    }
}

export default CourseRoute;