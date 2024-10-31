import React, { useEffect, useState } from 'react'
import './Stuudent.css'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuArrowDownUp } from "react-icons/lu";

function Student() {
    const [data, setdata] = useState({})
    const [list, setlist] = useState([])
    const [pos, setpos] = useState(-1)
    const [search, setsearch] = useState("")
    const [showpassword, setshowpassword] = useState(false)
    useEffect(() => {
        let newlist = JSON.parse(localStorage.getItem("records")) || []
        setlist(newlist)
    }, [setlist])

    // =======================input
    let setinput = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setdata({ ...data, [name]: value })
    }
    // ==============================================submit edit
    let submitdata = (e) => {
        e.preventDefault()
        if (pos != -1) {
            list.map((val, i) => {
                if (i == pos) {
                    list[i] = data
                    localStorage.setItem("records", JSON.stringify([...list]))
                }

            })
        }
        else {
            let res = [...list, data]
            setlist(res)
            console.log(res);
            localStorage.setItem("records", JSON.stringify(res))
        }
        setdata({})
        setpos(-1)
    }
    // ==================================================delete=============
    let remove = (pos) => {
        let removedata = list.filter((val, i) => {
            return pos != i
        })
        setlist(removedata)
        localStorage.setItem("records", JSON.stringify(removedata))
    }
    // ========================================================update===
    let update = (pos) => {
        console.log(pos);
        setpos(pos)
        let updata = list.filter((val, i) => {
            if (i == pos) {
                return val
            }
        })
        console.log(updata[0]);
        setdata(updata[0])

    }
    // ========================================================search===
    let searchingdata = (e) => {
        let values = e.target.value
        console.log(values);
        setsearch(values)
    }
    // ===========================================================sort===
    const [res, setres] = useState(false)
    let sortby = (type) => {
        let newlist = [...list]
        // =====================================first name
        if (res==false || res==true) {
            if (type == "fname" && res == false) {
                newlist.sort((a, b) => a.fname.localeCompare(b.fname))
                res==true
            }
            else {
                newlist.sort((a, b) => b.fname.localeCompare(a.fname))
            }
        }
        setlist(newlist)
    }
    return (
        <>
            <div className='container'>
                <div>
                    <form action="" metdod='post' onSubmit={(e) => { submitdata(e) }}>
                        <h1>Student Registration</h1>
                        <div>
                            <div className='data'>
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <input type="text" className='inputs' placeholder='my first name' name='fname' value={data.fname ? data.fname : ""} onChange={(e) => { setinput(e) }} />
                                    </div>
                                </div>
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <input type="text" className='inputs' placeholder='my last name' name='lname' value={data.lname ? data.lname : ""} onChange={(e) => { setinput(e) }} />
                                    </div>
                                </div>
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <input type="email" className='inputs' placeholder='abc@gmail.com' name='email' value={data.email ? data.email : ""} onChange={(e) => { setinput(e) }} />
                                    </div>
                                </div>               
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <input type="number" className='inputs' placeholder='phone' name='phone' value={data.phone ? data.phone : ""} onChange={(e) => { setinput(e) }} />
                                    </div>
                                </div>
                                {/* ================================================select=========== */}
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <select name="city" id="" className='inputs' onChange={(e) => { setinput(e) }}>
                                            <option value="">My city</option>
                                            <option value="surat">surat</option>
                                            <option value="ahemdabad">Ahemdabad</option>
                                            <option value="bharuch">Bharuch</option>
                                            <option value="vapi">Vapi</option>

                                            <option value="mumbai">mumbai</option>
                                            <option value="bengaluru">Bengaluru</option>
                                            
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ==================================================gender========= */}
                        <div className='borders'>
                            <div className='values'>
                                <h3 style={{ marginBottom: "5px" }}>Gender</h3>
                                <div style={{ display: "flex" }}>
                                    <input type="radio" name='gender' value="male" onChange={(e) => { setinput(e) }} />
                                    <h4>Male</h4>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="radio" name='gender' value="female" onChange={(e) => { setinput(e) }} />
                                    <h4>Female</h4>
                                </div>
                            </div>
                        </div>
                        {/* ==================================================checkbox */}
                        <div className='borders'>
                            <div className='values'>
                                <h3 style={{ marginBottom: "5px" }}>Hobbies</h3>
                                <div style={{ display: "flex" }}>
                                    <input type="checkbox" name='hobbies' />
                                    <h4>Cricket</h4>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="checkbox" name='hobbies' />
                                    <h4>Footbal</h4>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="checkbox" name='hobbies' />
                                    <h4>Chess</h4>
                                </div>
                            </div>
                        </div>
                        {/* ============================================================password */}
                        <div className='borders'>
                            <div className='values'>
                                <div style={{ display: "flex" }}>
                                    <input type={showpassword == true ? "text" : "password"} placeholder='Password' style={{ width: "70.6%", marginBottom: "20px", padding: "10px" }} name='password' onChange={(e) => { setinput(e) }} value={data.password ? data.password : ""} />
                                    <div style={{ marginLeft: "10px" }}>
                                        <button onClick={() => { setshowpassword(showpassword == false) }} style={{ height: "65%" }} type='button'>
                                            {/* <input type="checkbox"/> */}
                                            <h3>{showpassword == false ? "show" : "hide"}</h3>
                                        </button>
                                    </div>
                                </div>
                                <input type='submit' style={{ width: "100%", padding: "10px" }} value={pos != -1 ? "edit" : "Register"}></input>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            <div className="container-wl">
                {/* ===============================================search */}

                <input type="text" placeholder='search' style={{ marginBottom: "10px", padding: "10px" }} onChange={(e) => { searchingdata(e) }} />

                {/* ============================================ printed data */}
                <table>
                    <tr className='rows'>
                        <th>First Name
                            <button className='btn3' onClick={() => { sortby("fname"); setres(res == false) }}><LuArrowDownUp /></button>
                        </th>
                        <th>Last Name
                            <button className='btn3' onClick={() => { sortby("lname") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Email
                            <button className='btn3' onClick={() => { sortby("email") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Phone
                            <button className='btn3' onClick={() => { sortby("phone") }}><LuArrowDownUp /></button>
                        </th>
                        <th>City
                            <button className='btn3' onClick={() => { sortby("city") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Gender
                            <button className='btn3' onClick={() => { sortby("gender") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Hobbies
                            <button className='btn3' onClick={() => { sortby("hobbies") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Password
                            <button className='btn3' onClick={() => { sortby("password") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Action </th>
                    </tr>
                    {/* </div> */}
                    {/* <div> */}
                    {
                        list
                            .filter((val, i) => {
                                if (search === "") {
                                    return val
                                }
                                else if (val.fname.toLocaleLowerCase().match(search.toLocaleLowerCase())) {
                                    return val
                                }
                            })
                            .map((val, i) => {
                                return (
                                    <>
                                        <tr className='table-data' key={i}>
                                            <td>{val.fname}</td>
                                            <td>{val.lname}</td>
                                            <td>{val.email}</td>
                                            <td>{val.phone}</td>
                                            <td>{val.city}</td>
                                            <td>{val.gender}</td>
                                            <td>{val.hobbies}</td>
                                            <td>{val.password}</td>
                                            <td>
                                                <button className='btn' onClick={() => { update(i) }}><FaEdit /></button>
                                                <button className='btn btn2' onClick={() => { remove(i) }}><RiDeleteBin6Line /></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                    }
                    {/* </div> */}
                </table>

            </div>
        </>
    )
}

export default Student