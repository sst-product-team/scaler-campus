import './Students.css'

export default function Students() {

    return (
        <div className="Students">
            <div className="topNavActions">
                <div className="info">
                    Manage Students 
                </div>
                <div className="actions">
                    <button className="btn outlined ">Import Students</button>
                    <button className="btn">Add Student</button>
                </div>
            </div>
            <div className="studentDisplay">
                {/* <div className="tablehead font-[600] bg-[#0f0e0ef8] text-[#f8f9fa] p-4 rounded-[10px]">
                    <div className="studentName">Student Name</div>
                    <div className="studentEmail">Email</div>
                    <div className="studentPhone">Phone</div>
                    <div className="studentActions">Actions</div>
                </div> */}
                <table className='w-[100%]'>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        <tr>
                            <td>John Doe</td>
                            <td>kushagra.rigel@gmail.com</td>
                            <td>+91 7018440235</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

}