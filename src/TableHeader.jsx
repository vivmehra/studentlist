import React from 'react';

const TableHeader = (()=>{
    return( 
        <div className="mt-4">
        <h6 className="font-weight-bold">Student List</h6>
        <table className="table">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Marks Obtained</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
     )
});

export default TableHeader;