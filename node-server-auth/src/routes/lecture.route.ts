import { Router } from "express";
import LectureController from "../controllers/lecture.controller";

class LecureRoute {

    public router: Router;
    public lectureController: LectureController;

    constructor() {
        this.router = Router();
        this.lectureController = new LectureController();
        this.routes();
    }

    private routes() {
        this.router.get('/', this.lectureController.getAllLectures);
        this.router.get('/:lectureId', this.lectureController.getLectureById);
        this.router.post('/', this.lectureController.createLecture);
        this.router.put('/:lectureId', this.lectureController.updateLecture);
        this.router.delete('/:lectureId', this.lectureController.deleteLecture);
        this.router.get('/:lectureId/courses', this.lectureController.getLectureCourses);
        this.router.post('/:lectureId/courses/', this.lectureController.addLectureCourse);
        this.router.delete('/:lectureId/courses/:courseId', this.lectureController.deleteLectureCourse);
    }

}

export default LecureRoute;