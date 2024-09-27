import { PrismaClient } from '@prisma/client';
import CourseDTO from '../models/CourseDTO';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

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
        const allCourses = await this.prismaClient.course.findMany();
        const courses: CourseDTO[] = allCourses.map((course) => ({
            id: course.CourseId,
            Name: course.Name,
            Description: course.Description,
        }));
        res.json(courses);
    }

    async getCourseById(req: Request, res: Response) {
        const courseId = parseInt(req.params.courseId);
        const course = await this.prismaClient.course.findUnique({
            where: { CourseId: courseId },
        });

        if (course) {
            const c: CourseDTO = {
                id: course.CourseId,
                Name: course.Name,
                Description: course.Description,
            };
            res.json(c);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    }

    async createCourse(req: Request, res: Response) {
        const { name, desc } = req.body;
        const course = { Name: name, Description: desc };
        const newCourse = await this.prismaClient.course.create({
            data: course,
        });
        res.json(newCourse);
    }

    async updateCourse(req: Request, res: Response) {
        const courseId = parseInt(req.params.courseId);
        const { name, desc } = req.body;
        const course = { Name: name, Description: desc };

        if (!course.Name && !course.Description) {
            res.status(400).json({ message: 'Name or Description is required' });
            return;
        }

        const currentCourse = await this.prismaClient.course.findUnique({
            where: { CourseId: courseId },
        });

        if (!currentCourse) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }

        if (!course.Name) course.Name = currentCourse.Name;
        if (!course.Description) course.Description = currentCourse.Description;

        const updatedCourse = await this.prismaClient.course.update({
            where: { CourseId: courseId },
            data: course,
        });

        res.json(updatedCourse);
    }

    async deleteCourse(req: Request, res: Response) {
        res.send('Course cannot be deleted');
    }

    async getCourseBathes(req: Request, res: Response) {
        const courseId = parseInt(req.params.courseId);

        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        const course = await this.prismaClient.course.findUnique({
            where: { CourseId: courseId },
        });

        if (!course) {
            return res.status(400).json({ message: 'Course not found' });
        }

        const batches = await this.prismaClient.courseBatches.findMany({
            where: { CourseId: courseId },
        });

        const batchData = await Promise.all(
            batches.map(async (batch) => {
                const batchData = await this.prismaClient.batch.findUnique({
                    where: { BatchId: batch.BatchId },
                });
                if (!batchData) {
                    return res.status(400).json({ message: 'Batch not found' });
                }
                return batchData;
            })
        );

        res.json(batchData);
    }

    async addCourseBatch(req: Request, res: Response) {
        const { courseId } = req.params;
        const { batches } = req.body;

        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }
        if (!batches) {
            return res.status(400).json({ message: 'Batches are required' });
        }

        const course = await this.prismaClient.course.findUnique({
            where: { CourseId: parseInt(courseId) },
        });

        if (!course) {
            return res.status(400).json({ message: 'Course not found' });
        }

        await Promise.all(
            batches.map(async (batch: number) => {
                const batchExists = await this.prismaClient.batch.findUnique({
                    where: { BatchId: batch },
                });

                if (!batchExists) {
                    return res.status(400).json({ message: 'Batch not found' });
                }

                const courseBatchExists = await this.prismaClient.courseBatches.findFirst({
                    where: { CourseId: parseInt(courseId), BatchId: batch },
                });

                if (courseBatchExists) {
                    return res.status(400).json({ message: 'Batch already exists for the course' });
                }

                await this.prismaClient.courseBatches.create({
                    data: { CourseId: parseInt(courseId), BatchId: batch },
                });
            })
        );

        res.json({ message: 'Batches added to course' });
    }

    async deleteCourseBatch(req: Request, res: Response) {
        const courseID = parseInt(req.params.courseId);
        const batchID = parseInt(req.params.batchId);

        if (!courseID) {
            return res.status(400).json({ message: 'Course ID is required' });
        }
        if (!batchID) {
            return res.status(400).json({ message: 'Batch ID is required' });
        }

        const course = await this.prismaClient.course.findUnique({
            where: { CourseId: courseID },
        });

        if (!course) {
            return res.status(400).json({ message: 'Course not found' });
        }

        const batch = await this.prismaClient.batch.findUnique({
            where: { BatchId: batchID },
        });

        if (!batch) {
            return res.status(400).json({ message: 'Batch not found' });
        }

        const courseBatch = await this.prismaClient.courseBatches.findFirst({
            where: { CourseId: courseID, BatchId: batchID },
        });

        if (!courseBatch) {
            return res.status(400).json({ message: 'Course batch not found' });
        }

        await this.prismaClient.courseBatches.delete({
            where: {
                CourseId_BatchId: {
                    CourseId: courseID,
                    BatchId: batchID,
                },
            },
        });

        res.send(`Batch "${batch.Name}" removed from course "${course.Name}"`);
    }
}

export default CourseController;
