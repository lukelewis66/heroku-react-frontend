import React, { useState, useEffect } from "react";

import { getContractor } from "../../firebase/Contractor";

const ContractorInfo = () => {
	const [contractor, setContractor] = useState({
		name: "",
		location: "",
		bio: "",
		skilltags: [],
		email: "",
		phone: "",
	});
	const [apiCalls, setApiCalls] = useState(0);

	useEffect(() => {
		getContractor(localStorage.getItem("UID")).then((contractor) => {
			setApiCalls(apiCalls + 1);
			setContractor(contractor);
		})
	}, [])
	return (
		<div className="infoPanel">
			<h2>Name: {contractor.name}</h2>
			<h2>Bio: {contractor.bio}</h2>
			<h3>Email: {contractor.email}</h3>
			<h3>Phone: {contractor.phone}</h3>
			<h3>Location: {contractor.location}</h3>
			<h3>Skills: {contractor.skilltags}</h3>
			<h3>Rating: </h3>
		</div>)
}

export default ContractorInfo
