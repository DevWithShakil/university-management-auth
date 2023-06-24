import { z } from 'zod';
import { bloodGroup, gender } from '../students/student.constant';

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      middleName: z.string().optional(),
      lastName: z.string(),
    }),
    gender: z.enum([...gender] as [string, ...string[]]),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    academicSemester: z.string(),
    academicDepartment: z.string(),
    academicFaculty: z.string(),
    guardian: z
      .object({
        fatherName: z.string(),
        fatherOccupation: z.string(),
        fatherContactNo: z.string(),
        motherName: z.string(),
        motherOccupation: z.string(),
        motherContactNo: z.string(),
        address: z.string(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string(),
        occupation: z.string(),
        contactNo: z.string(),
        address: z.string(),
      })
      .optional(),
    profileImage: z.string().optional(),
  }),
});

export const StudentValidation = {
  updateStudentZodSchema,
};
