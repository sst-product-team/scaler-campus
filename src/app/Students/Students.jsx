import './Students.css'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';


export default function Students() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const students = {
    1: {
        name: 'Kushagra Sharma',
        email: 'kushagra.rigel@gmail.com',
        phone: '+91 70184-40235',
        courses: {
            1: {
                name: 'DSA III',
                status: 'current',
                attendance: {
                    'June 03, 2024': 'Present',
                    'June 04, 2024': 'Absent'
                }
            },
            2: {
                name: 'CS Fundamentals',
                status: 'current',
                attendance: {
                    'June 03, 2024': 'Present',
                    'June 04, 2024': 'Absent'
                }
            }
        }
    },
    2: {
        name: 'Rudra Chauhan',
        email: 'rudrakcofficial@gmail.com',
        phone: '+91 96373-96633',
        courses: {
            1: {
                name: 'DSA III',
                status: 'current',
                attendance: {
                    'June 03, 2024': 'Absent',
                    'June 04, 2024': 'Present'
                }
            },
            2: {
                name: 'CS Fundamentals',
                status: 'current',
                attendance: {
                    'June 03, 2024': 'Present',
                    'June 04, 2024': 'Absent'
                }
            }
        }
    }

  }
    
    return (
        <div className="Students">
            <div className="topNavActions">
                <div className="info">
                    Manage Students 
                </div>
                <div className="actions">
                    <button className="butn outlined">Import Students</button>
                    <Offcanvas show={show} onHide={handleClose} placement='end'>
                                            <Offcanvas.Header closeButton>
                                                <Offcanvas.Title>Student Details</Offcanvas.Title>
                                            </Offcanvas.Header>
                                            <Offcanvas.Body>
                                                
                                            </Offcanvas.Body>
                                        </Offcanvas>
                    <button className="butn">Add Student</button>
                </div>
            </div>
            <div className="studentDisplay">
                <table className='w-[100%] text-left'>
                    <thead className='bg-[#0f0e0ef8] text-white'>
                        <tr>
                            <th className='p-4'>Student Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th className='text-transparent'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {Object.keys(students).map((studentId) => {
                            return (
                                <tr key={studentId} className='border-b border-[#0f0e0ef8]'>
                                    <td className='p-4'>{students[studentId].name}</td>
                                    <td>{students[studentId].email}</td>
                                    <td>{students[studentId].phone}</td>
                                    <td>
                                        <button className="butn outlined" onClick={handleShow}>View</button>
                                        <Offcanvas show={show} onHide={handleClose} placement='end'>
                                            <Offcanvas.Header closeButton>
                                                <Offcanvas.Title>Student Details</Offcanvas.Title>
                                            </Offcanvas.Header>
                                            <Offcanvas.Body>
                                                <div className="studentDetails">
                                                    <div className="studentInfo bg-red-200">
                                                        <div className="studentImage w-1/3 h-1/3 bg-green-200"></div>
                                                        <div className="studentName">{students[studentId].name}</div>
                                                        <div className="studentEmail">{students[studentId].email}</div>
                                                        <div className="studentPhone">{students[studentId].phone}</div>
                                                    </div>
                                                    <div className="studentCourses">
                                                        <Accordion defaultActiveKey="0">
                                                            {Object.keys(students[studentId].courses).map((courseId) => {
                                                                return (
                                                                    <Accordion.Item eventKey={courseId} key={courseId}>
                                                                        <Accordion.Header>{students[studentId].courses[courseId].name}</Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <div className="courseStatus">{students[studentId].courses[courseId].status}</div>
                                                                            <table className='w-[100%] text-left'>
                                                                                <thead className='bg-[#0f0e0ef8] text-white'>
                                                                                    <tr>
                                                                                        <th>Date</th>
                                                                                        <th>Attendance</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {Object.keys(students[studentId].courses[courseId].attendance).map((date) => {
                                                                                        return (
                                                                                            <tr key={date} className='border-b border-[#0f0e0ef8]'>
                                                                                                <td>{date}</td>
                                                                                                <td>{students[studentId].courses[courseId].attendance[date]}</td>
                                                                                            </tr>
                                                                                        );
                                                                                    })}
                                                                                </tbody>
                                                                            </table>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                );
                                                            })}
                                                        </Accordion>
                                                    </ div>
                                                </div>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

// any additon made to the vdom would changes the index of the components changing their id's
// causing unnecessary rerenders


{/* <tr>
                            <td className='p-4'>Kushagra S</td>
                            <td>kushagra.rigel@gmail.com</td>
                            <td>+91 7018440235</td>
                            <td className='cursor-pointer' onClick={handleShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" height={22} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                            </td>
                            <Offcanvas show={show} onHide={handleClose} placement='end' className="w-1/2">
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Edit Student</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <div className="w-[100%] h-[50%] flex flex-column justify-center items-center gap-3">
                                        <div className="w-[175px] h-[175px] bg-slate-200 rounded-[50%] bg-[url('https://i.postimg.cc/hvHZFPKN/20240511-143534.jpg')] bg-center bg-cover">
                                        </div>
                                        <div className="font-semibold text-[1.5rem]">
                                            Kushagra Sharma
                                        </div>
                                        <div className="">kushagra.rigel@gmail.com</div>
                                        <div className="">+91 70184-40235</div>
                                    </div>

                                    <div className="">
                                    <div className="pt-6 text-lg font-semibold">Student Courses</div>      
                                    <Accordion defaultActiveKey="-1" className='pt-3'>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                DSA III
                                                <div className="badge text-dark">Current</div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="flex gap-4 items-center pt-2">
                                                    <span className='text-sm'>June 03, 2024</span>
                                                    <span className='bg-green-200 p-1 rounded-[10%]'>Present</span>
                                                </div>
                                                <div className="flex gap-4 items-center pt-2">
                                                    <span className='text-sm'>June 04, 2024</span>
                                                    <span className='bg-red-200 p-1 rounded-[10%]'>Absent</span>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>
                                                CS Fundamentals
                                                <div className="badge text-dark">Current</div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className="flex gap-4 items-center pt-2">
                                                    <span className='text-sm'>June 03, 2024</span>
                                                    <span className='bg-green-200 p-1 rounded-[10%]'>Present</span>
                                                </div>
                                                <div className="flex gap-4 items-center pt-2">
                                                    <span className='text-sm'>June 04, 2024</span>
                                                    <span className='bg-red-200 p-1 rounded-[10%]'>Absent</span>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    </div>

                                    <div className="text-[#323232] font-semibold mt-10 mb-1 flex items-center gap-2 cursor-pointer">
                                        view detailed attendance
                                        <svg height={22} fill='#323232'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                    </div>
                                    <div className="text-[#323232] font-semibold mt-2 mb-1 flex items-center gap-2 cursor-pointer">
                                        view student Info
                                        <svg height={22} fill='#323232'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                                    </div>


                                </Offcanvas.Body>
                            </Offcanvas>
                        </tr> */}