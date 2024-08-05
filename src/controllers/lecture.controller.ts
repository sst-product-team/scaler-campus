import {prisma, PrismaClient} from '../utils/prismaClient';
import LectureDTO from '../models/LectureDTO';
import {Request, Response} from 'express';
import { resolve } from 'path';
import { start } from 'repl';

class LectureController {
    public prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = prisma;
        this.getAllLectures = this.getAllLectures.bind(this);
        this.getLectureById = this.getLectureById.bind(this);
        this.createLecture = this.createLecture.bind(this);
        this.updateLecture = this.updateLecture.bind(this);
        this.deleteLecture = this.deleteLecture.bind(this);
        this.getLectureCourses = this.getLectureCourses.bind(this);
        this.addLectureCourse = this.addLectureCourse.bind(this);
        this.deleteLectureCourse = this.deleteLectureCourse.bind(this);
    }

    async getAllLectures(req: Request, res: Response) {

        const allLectures = await this.prismaClient.lecture.findMany();

        res.json(allLectures);

    }

    async getLectureById(req: Request, res: Response) {
        // get the lecture id from the request
        const lectureId = parseInt(req.params.lectureId);

        // validate the lecture id
        if (isNaN(lectureId)) {
            res.status(400).json({message: 'Invalid lecture id'});
            return;
        }

        // get the lecture from the database
        const lecture = await this.prismaClient.lecture.findUnique({
            where: {
                LectureId: lectureId
            }
        });

        if (lecture) {
            res.json(lecture);
        } else {
            res.status(404).json({message: 'Lecture not found'});
        }
    }

    async createLecture(req: Request, res: Response) {
        try {
            // get the lecture data from the request body
            const lectureData : LectureDTO = req.body;

            // validate the lecture data
            if (!lectureData) {
                res.status(400).json({message: 'Invalid lecture data'});
                return;
            }

            // check if the lecture already exists
            const lectureExists = await this.prismaClient.lecture.findFirst({
                where: {
                    Name: lectureData.Name,
                    LectureDate: lectureData.startTime
                }
            });

            // validate the lecture
            if (lectureExists) {
                res.status(400).json({message: 'Lecture already exists'});
                return;
            }

            // format date and time
            lectureData.startTime = new Date(lectureData.startTime).toISOString();
            lectureData.endTime = new Date(lectureData.endTime).toISOString();
            
            // create the lecture
            const lecture = await this.prismaClient.lecture.create({
                data: {
                    Name: lectureData.Name,
                    Description: lectureData.Description,
                    StartTime: lectureData.startTime,
                    EndTime: lectureData.endTime,
                    LectureDate: new Date(),
                    AttendanceType: lectureData.attendanceType,
                    MininumAttendance: lectureData.minAttendance
                }
            });

            res.json(lecture);   
        } catch (error) {
            console.log(error);
            
            res.status(500).json({message: 'Internal server error', error: error});
        }
    }

    async updateLecture(req: Request, res: Response) {
        // get the lecture id from the request
        const lectureId = parseInt(req.params.lectureId);

        // validate the lecture id
        if (isNaN(lectureId)) {
            res.status(400).json({message: 'Invalid lecture id'});
            return;
        }

        // get the lecture data from the request body
        const lectureData : LectureDTO = req.body;

        if (!lectureData) {
            res.status(400).json({message: 'Invalid lecture data'});
            return;
        }

        // get the lecture from the database
        const lectureExists = await this.prismaClient.lecture.findUnique({
            where: {
                LectureId: lectureId
            }
        });

        // validate the lecture
        if (!lectureExists) {
            res.status(404).json({message: 'Lecture not found'});
            return;
        }

        // fix missing feilds
        lectureData.Name = lectureData.Name ?? lectureExists.Name;
        lectureData.Description = lectureData.Description ?? lectureExists.Description;
        lectureData.startTime = lectureData.startTime ?? lectureExists.StartTime;
        lectureData.endTime = lectureData.endTime ?? lectureExists.EndTime;
        // lectureData.date = lectureData.date || lectureExists.LectureDate;
        lectureData.attendanceType = lectureData.attendanceType || lectureExists.AttendanceType;
        lectureData.minAttendance = lectureData.minAttendance || lectureExists.MininumAttendance


        // update the lecture
        const lecture = await this.prismaClient.lecture.update({
            where: {
                LectureId: lectureId
            },
            data: {
                Name: lectureData.Name,
                Description: lectureData.Description,
                StartTime: lectureData.startTime,
                EndTime: lectureData.endTime,
                // LectureDate: lectureData.date,
                AttendanceType: lectureData.attendanceType,
                MininumAttendance: lectureData.minAttendance
            }
        });

        res.json(lecture);
    }

    async deleteLecture(req: Request, res: Response) {
        res.json({message: 'Not implemented yet'});
    }

    async getLectureCourses(req: Request, res: Response) {
        const lectureId = parseInt(req.params.lectureId);

        // validate the lecture id
        if (isNaN(lectureId)) {
            res.status(400).json({message: 'Invalid lecture id'});
            return;
        }

        // get the lecture from the database
        const lecture = await this.prismaClient.lecture.findUnique({
            where: {
                LectureId: lectureId
            }
        });

        // validate the lecture
        if (!lecture) {
            res.status(404).json({message: 'Lecture not found'});
            return;
        }

        // get the courses affiliated with the lecture
        const lectureCourses = await this.prismaClient.lectureCourse.findMany({
            where: {
                LectureId: lectureId
            }
        });

        // get the course details for each course
        const lectureDetails = new Promise<any[]>((resolve, reject) => {
            const lectureDetails: any[] = [];
            lectureCourses.forEach(async(lecture, index, array) => {
                const details = await this.prismaClient.course.findUnique({
                    where: {
                        CourseId: lecture.CourseId
                    }
                });

                // validate data
                if (!details) {
                    res.status(404).json({message: 'Course not found'});
                    return;
                }

                // add the course details to the lecture
                lectureDetails.push({
                    CourseId: details.CourseId,
                    Name: details.Name,
                    Description: details.Description
                });
                if(index == array.length - 1) {
                    resolve(lectureDetails);
                }
            });
        });

        lectureDetails.then((result: any) => {
            res.json(result);
        }).catch((err: any) => {
            res.status(500).json({message: 'Internal server error', error: err});
        });
    }

    async addLectureCourse(req: Request, res: Response) {
        const {lectureId}= req.params;
        const {courses} = req.body;

        // validate the lecture id
        if (isNaN(parseInt(lectureId))) {
            res.status(400).json({message: 'Invalid lecture id'});
            return;
        }

        // validate the course data
        if (!courses) {
            res.status(400).json({message: 'Invalid course data'});
            return;
        }

        // get the lecture from the database
        const lecture = await this.prismaClient.lecture.findUnique({
            where: {
                LectureId: parseInt(lectureId)
            }
        });

        // validate the lecture
        if (!lecture) {
            res.status(404).json({message: 'Lecture not found'});
            return;
        }

        // add the courses to the lecture
        await new Promise((resolve, reject) => {
            courses.forEach(async (courseId: number, index: number, array: any[]) => {

                // check if the course exists
                const course = await this.prismaClient.course.findUnique({
                    where: {
                        CourseId: courseId
                    }
                });

                if (!course) {
                    res.status(404).json({message: 'Course not found'});
                    return;
                }

                // check if the lecture course exists
                const lectureCourse = await this.prismaClient.lectureCourse.findFirst({
                    where: {
                        LectureId: parseInt(lectureId),
                        CourseId: courseId
                    }
                });

                if (lectureCourse) {
                    res.status(400).json({message: 'Course already added to lecture'});
                    return;
                }

                // add the course to the lecture
                await this.prismaClient.lectureCourse.create({
                    data: {
                        LectureId: parseInt(lectureId),
                        CourseId: courseId
                    }
                });
                if (index == array.length - 1) {
                    resolve(true);
                }
            });
        }).then(() => {
            res.json({message: 'Courses added to lecture successfully'});
        });
    }

    async deleteLectureCourse(req: Request, res: Response) {
        const lectureId = parseInt(req.params.lectureId);
        const courseId = parseInt(req.params.courseId);

        // validate the lecture id
        if (isNaN(lectureId)) {
            res.status(400).json({message: 'Invalid lecture id'});
            return;
        }

        // validate the course id
        if (isNaN(courseId)) {
            res.status(400).json({message: 'Invalid course id'});
            return;
        }

        // get the lecture course from the database
        const lectureCourse = await this.prismaClient.lectureCourse.findFirst({
            where: {
                LectureId: lectureId,
                CourseId: courseId
            }
        });

        // validate the lecture course
        if (!lectureCourse) {
            res.status(404).json({message: 'Course not affiliated with lecture'});
            return;
        }

        // delete the lecture course
        await this.prismaClient.lectureCourse.delete({
            where: {
                LectureId_CourseId: {
                    LectureId: lectureId,
                    CourseId: courseId
                } 
            }
        }).then(() => {
            res.json({message: 'Course removed from lecture successfully'});
        });
    }
}

export default LectureController;