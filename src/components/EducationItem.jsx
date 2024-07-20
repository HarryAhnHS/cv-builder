// import uuid from "react-uuid";
// import {useState} from "react";

// function EducationItem() {
//     const [educationEntry, setEducationEntry] = useState({
//         schoolName: '',
//         degree: '',
//         startDate: '',
//         endDate: '',
//         uuid: uuid()
//     });

//     return (<>
//             <label htmlFor="schoolName">School Name:
//                 <input
//                     name="schoolName"
//                     type="text"
//                     value={educationEntry.schoolName}
//                     onChange = {handleInputChange}
//                 />
//             </label>
//             <label htmlFor="degree">Degree:
//                 <input
//                     name="degree"
//                     type="text"
//                     value={educationEntry.degree}
//                     onChange = {handleInputChange}
//                 />
//             </label>
//             <label htmlFor="startDate">Program Start Date:
//                 <input
//                     name="startDate"
//                     type="date"
//                     value={educationEntry.startDate}
//                     onChange = {handleInputChange}
//                 />
//             </label>
//             <label htmlFor="endDate">Program End Date:
//                 <input
//                     name="endDate"
//                     type="date"
//                     value={educationEntry.endDate}
//                     onChange = {handleInputChange}
//                 />
//             </label>
//     </>)
// }

// export default EducationItem;