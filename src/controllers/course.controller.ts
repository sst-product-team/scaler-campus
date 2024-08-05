import { prisma, PrismaClient } from "../utils/prismaClient";
import CourseDTO from "../models/CourseDTO";
import { Request, Response } from "express";

class CourseController {

    public prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = prisma;
        this.getAllCourses = this.getAllCourses.bind(this);
        this.getCourseById = this.getCourseById.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.getCourseBathes = this.getCourseBathes.bind(this);
        this.addCourseBatch = this.addCourseBatch.bind(this);
        this.deleteCourseBatch = this.deleteCourseBatch.bind(this);
    }

    async getAllCourses(req: Request, res: Response) {

        // get all courses from the database
        const allCourses = await this.prismaClient.course.findMany();

        // map the courses to the Course
        const courses : CourseDTO[] = allCourses.map((course) => {
            const c : CourseDTO = {
                id: course.CourseId,
                Name: course.Name,
                Description: course.Description
            };

            return c;
        });

        // send the response
        res.json(courses);
    }

    async getCourseById(req: Request, res: Response) {
        const courseId = parseInt(req.params.courseId);
        const course = await this.prismaClient.course.findUnique({
            where: {
                CourseId: courseId
            }
        });

        if (course) {
            const c: CourseDTO = {
                id: course.CourseId,
                Name: course.Name,
                Description: course.Description
            };

            res.json(c);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }

    async createCourse(req: Request, res: Response) {
        const {name, desc} = req.body; // get the course from the request body

        // check if name or description is provided
        const course = {
            "Name": name,
            "Description": desc
        };

        // create the course in the database
        const newCourse = await this.prismaClient.course.create({
            data: {
                Name: course.Name,
                Description: course.Description
            }
        });

        // send the response
        res.json(newCourse);

    }

    async updateCourse(req: Request, res: Response) {
        const courseId = parseInt(req.params.courseId);
        const {name, desc} = req.body;

        const course = {
            Name: name,
            Description: desc
        }

        // check if name or description is provided
        if(!course.Name && !course.Description) {
            res.status(400).json({ message: "Name or Description is required" });
            return;
        }

        // get course from the database
        const currentCourse = await this.prismaClient.course.findUnique({
            where: {
                CourseId: courseId
            }
        });

        // check if course exists
        if(!currentCourse) {
            res.status(404).json({ message: "Course not found" });
            return;
        }

        // if new name not present use old name
        if(!course.Name) {
            course.Name = currentCourse.Name;
        }

        // if new description not present use old description
        if(!course.Description) {
            course.Description = currentCourse.Description;
        }

        // update the course in the database
        const updatedCourse = await this.prismaClient.course.update({
            where: {
                CourseId: courseId
            },
            data: {
                Name: course.Name,
                Description: course.Description
            }
        });

        // send the response
        res.json(updatedCourse);

    }

    async deleteCourse(req: Request, res: Response) {
        // TODO: Delete course not implemented since it is not required for the course
        res.send("Course cannot be deleted");
    }

    async getCourseBathes(req: Request, res: Response) {
        const courseId = parseInt(req.params.courseId);
        
        // validate data
        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        // get the course
        const course = await this.prismaClient.course.findUnique({
            where: {
                CourseId: courseId
            }
        });

        // validate data
        if (!course) {
            return res.status(400).json({ message: 'Course not found' });
        }

        // get the batches
        const batches = await this.prismaClient.courseBatches.findMany({
            where: {
                CourseId: courseId
            }
        });

        // return proper batch data instead of ids
        const batchData = new Promise<any[]>((resolve, reject) => {
            const BatchDeatils: any[] = []
            batches.forEach(async (batch : any, index: number, array: any[]) => {
                const batchData = await this.prismaClient.batch.findUnique({
                    where: {
                        BatchId: batch.BatchId
                    }
                });

                if (!batchData) {
                    return res.status(400).json({ message: 'Batch not found' });
                }

                BatchDeatils[index] = batchData;

                if(index == array.length - 1) {
                    resolve(BatchDeatils);
                }
            });
        });

        // send response
        batchData.then((result) => {
            res.json(result);
        });
    }

    async addCourseBatch(req: Request, res: Response) {
        const {courseId} = req.params;
        const {batches} = req.body;

        // validate data
        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }
        if (!batches) {
            return res.status(400).json({ message: 'Batches are required' });
        }

        // get the course
        const course = await this.prismaClient.course.findUnique({
            where: {
                CourseId: parseInt(courseId)
            }
        });

        // validate data
        if (!course) {
            return res.status(400).json({ message: 'Course not found' });
        }

        // add the batches array to batches
        const courseBatches = new Promise<void>((resolve, reject) => {
            batches.forEach(async (batch : number, index: number, array: any[]) => {

                // get batch
                const batchExists = await this.prismaClient.batch.findUnique({
                    where: {
                        BatchId: batch
                    }
                });
    
                // validate data
                if (!batchExists) {
                    return res.status(400).json({ message: 'Batch not found' });
                }
    
                // check if batch already exists for the course
                const courseBatchExists = await this.prismaClient.courseBatches.findFirst({
                    where: {
                        CourseId: parseInt(courseId),
                        BatchId: batch
                    }
                });
    
                // validate data
                if (courseBatchExists !== null) {
                    return res.status(400).json({ message: 'Batch already exists for the course' });
                }
    
                // add the batch to the course
                await this.prismaClient.courseBatches.create({
                    data: {
                        CourseId: parseInt(courseId),
                        BatchId: batch
                    }
                });

                if(index == array.length - 1) {
                    resolve();
                }

            });
        });

        courseBatches.then(() => {
            res.json({ message: 'Batches added to course' });
        });

    }

    async deleteCourseBatch(req: Request, res: Response) {

        const courseID = parseInt(req.params.courseId);
        const batchID = parseInt(req.params.batchId);

        // validate data
        if (!courseID) {
            return res.status(400).json({ message: 'Course ID is required' });
        }
        if (!batchID) {
            return res.status(400).json({ message: 'Batch ID is required' });
        }

        // get the course
        const course = await this.prismaClient.course.findUnique({
            where: {
                CourseId: courseID
            }
        });

        // validate data
        if (!course) {
            return res.status(400).json({ message: 'Course not found' });
        }

        // get the batch
        const batch = await this.prismaClient.batch.findUnique({
            where: {
                BatchId: batchID
            }
        });

        // validate data
        if (!batch) {
            return res.status(400).json({ message: 'Batch not found' });
        }

        // get the course batch
        const courseBatch = await this.prismaClient.courseBatches.findFirst({
            where: {
                CourseId: courseID,
                BatchId: batchID
            }
        });

        // validate data

        if (!courseBatch) {
            return res.status(400).json({ message: 'Course batch not found' });
        }

        // delete the course batch
        await this.prismaClient.courseBatches.delete({
            where: {
                CourseId_BatchId: {
                    CourseId: courseID,
                    BatchId: batchID
                }
            }
        });

        // send response
        res.send(`Batch "${batch.Name}" removed from course "${course.Name}"`);
    }

}

export default CourseController;