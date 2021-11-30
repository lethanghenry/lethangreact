import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react'
import { useParams } from 'react-router';
import Swal from 'sweetalert2';



// import { Default } from 'react-toastify/dist/utils';
const listCategory = [
    { id: 0, name: "Thế Giới" },
    { id: 1, name: "Việt Nam" },
    { id: 2, name: "Thời Sự" },
    { id: 3, name: "Tin Tức" },
    { id: 4, name: "Bóng Đá" },
    { id: 5, name: "Âm Nhạc" },
    { id: 6, name: "Bóng Chuyền" },
    { id: 7, name: "Bóng Rổ" },
    { id: 8, name: "Cầu Lông" },
    { id: 9, name: "Quần Vợt" },
    { id: 10, name: "Đua Ngựa" },
    { id: 11, name: "Ảo Thuật" },
    { id: 12, name: "Chính Trị" }
];
const listPosition = [
    { id: 1, name: "Việt Nam" },
    { id: 2, name: "Châu Á" },
    { id: 3, name: "Châu Âu" },
    { id: 4, name: "Châu Mỹ" }
];

// import { useState } from 'react'
export default function New() {
    const url = "http://localhost:3000"
    const [checkedPosition, setCheckedPosition] = useState([]);
    const [checkCategory, setCheckCategory] = useState("");
    const [checkedPublic, setCheckedPublic] = useState("");
    const [post, setPost] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        getPostById(id);
    }, []);

    /**
     * Get post by id
     * @param {*} id
     * @returns mix
     */
    const getPostById = (id) => {
        if (id) {
            axios
                .get(`${url}/blogs/${id}`, {
                    params: {
                        id: id,
                    },
                }
                )
                .then(function (response) {
                    // console.log(response.data)
                    setPost(response.data)
                    let dataPositon = response.data.position
                        .split(",")
                        .map(function (item) {
                            return parseInt(item, 10);
                        });
                    setCheckedPosition([...dataPositon]);
                    setCheckedPublic(response.data.public == true ? 1 : 0)
                    // console.log(response.data.public)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    /*
    param id
    handle check position
    */
    const handleCheckPosition = (id) => {
        setCheckedPosition((prev) => {
            const isChecked = checkedPosition.includes(id)
            if (isChecked) {
                return checkedPosition.filter((item) => item !== id)
            }
            else {
                return [...prev, id]
            }
        })
    }

    /* 
        param id
        handle check public
    */
    const handleCheckPublic = (id) => {
        return setCheckedPublic(id);
    }

    /*
        param e
        function submit form 
        call api
    */
    const submit = (e) => {
        e.preventDefault();
        console.log((e.target.category.value))
        const post = {
            title: e.target.title.value,
            des: e.target.des.value,
            detail: e.target.detail.value,
            category: e.target.category.value,
            public: e.target.public.value,
            data_pubblic: e.target.data_pubblic.value,
            position: checkedPosition.toString(),
            thumbs: e.target.thumbs.value.split(/(\\|\/)/g).pop(),
        }

        if (id) {
            axios.put(`${url}/blogs/${id}`, post).then((res) => {
                Swal.fire("Cập nhật thành công", "", "success");
                window.location.href = "http://localhost:3001/";
            }).catch((error) => console.log(error));
        }
        else {
            axios.post(`${url}/blogs`, post).then((res) => {
                Swal.fire("Thêm mới thành công", "", "success");
                window.location.href = "http://localhost:3001/";
            }
            ).catch((error) => console.log(error));
        }


    }

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    New Blogs
                </div>
                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="form-group">
                            <label>Tiêu Đề </label>
                            <br />
                            <input type="text"
                                name="title"
                                defaultValue={post ? post.title : ""}
                                className="form-control " />
                        </div>

                        <div className="form-group">
                            <label>Mô Tả Ngắn</label>
                            <br />
                            <textarea rows="4"
                                name="des"
                                className="form-control"
                                defaultValue={post ? post.des : ""}
                            ></textarea>
                            <br />
                        </div>

                        <div className="form-group">
                            <label>Chi Tiết</label>
                            <br />
                            <textarea rows="4"
                                name="detail"
                                className="form-control"
                                defaultValue={post ? post.detail : ""}
                            ></textarea>
                            <br />
                        </div>

                        <div className="form-group">
                            <label>Hình ảnh:</label>
                            <input type="file"
                                name="thumbs"
                                className="form-control"
                            />
                            <br />
                            <label>Không có tệp nào được chọn</label>
                            <br />
                        </div>

                        <div className="form-group ">
                            <label>Vị trí</label>
                            <br />
                            {
                                listPosition.map((value, key) => {
                                    return (
                                        <div className="form-check form-check-inline" key={key}>
                                            <input className="form-check-input"
                                                type="checkbox"
                                                id={`position-${value.id}`}
                                                name="position"
                                                checked={checkedPosition.includes(value.id)}
                                                onChange={() => handleCheckPosition(value.id)}
                                            />
                                            {console.log(checkedPosition)}
                                            <label className="form-check-label" htmlFor={`position-${value.id}`}>
                                                {value.name}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            <br />
                        </div>

                        <div className="form-group " >
                            <label>Public</label>
                            <br></br>
                            <div className="form-check form-check-inline" >
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="1"
                                    name="public"
                                    defaultValue="1"
                                    checked={checkedPublic === 1}
                                    onChange={() => handleCheckPublic(1)}
                                />
                                <label className="form-check-label" htmlFor="1">Yes</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="public"
                                    defaultValue="0"
                                    id="0"
                                    checked={checkedPublic === 0}
                                    onChange={() => handleCheckPublic(0)}
                                />
                                <label className="form-check-label" htmlFor="0">No</label>
                            </div>
                            {console.log(checkedPublic)}
                        </div>
                        <br />

                        <div className="row">
                            <div className="form-group col-md-6">
                                <label>Loại</label>
                                <br />
                                <select className="form-control" name="category">
                                    {

                                        listCategory.map((value, key) => {
                                            if (value.id == post.category) {
                                                return (
                                                    <option key={key} value={value.id} selected={true} >
                                                        {value.name}
                                                    </option>
                                                )
                                            }
                                            else {
                                                return (
                                                    <option key={key} value={value.id}  >
                                                        {value.name}
                                                    </option>
                                                )
                                            }
                                        }
                                        )
                                    }
                                </select>
                                <br />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Date Public</label>
                                <br />
                                <input type="date"
                                    name="data_pubblic"
                                    className="form-control"
                                    defaultValue={post ? post.data_pubblic : ""}
                                />
                                <br />
                            </div>
                            <div className="form-group d-flex align-items-center justify-content-center">
                                <button className="btn btn-primary m-3" type="submit">Submit</button>
                                <button className="btn btn-success m-3" type="reset">Clear</button>
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
