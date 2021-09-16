import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import "./Home.css";
import axios from "axios";

const columns = [
    {
        name: "ID",
        selector: "id",
        sortable: true,
        wrap: true,
        width: "90px",
    },
    {
        name: "Name",
        selector: "name",
        sortable: true,
        // width: "0px",
        wrap: true,


    },
    {
        name: "Email",
        selector: "email",
        sortable: true,
        // width: "90px",
        wrap: true,


    },
];

function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState([]);

    useEffect(() => {

        async function fetchUserData() {
            axios
                .get("http://localhost:8000/api/user-list")
                .then((response) => {
                    setIsLoading(false)
                    if (response.status === 200) {
                        setUserData(response.data)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchUserData()

    }, []);

    return (
        <div className="">
            <h3> Welcome,</h3>
            <h5> Below are the registered User List 

            </h5>
            <Link to="/" className="text-white ml-5">Click here to register new user</Link>
            <div className="containers">
                    {
                        !isLoading && userData.length ? <DataTable
                            columns={columns}
                            data={userData}
                            paginationPerPage={10}
                            striped={true}
                            pagination={true}
                            noHeader={true}
                            highlightOnHover={true}
                        /> : !isLoading && userData.length === 0 ? "No data Found" : "Loading..."
                    }
            </div>
        </div>
    );
}

export default Home;