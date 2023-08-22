const toiletForm = document.getElementById("toilet-form");
const toiletId = document.getElementById("toilet-id");
const toiletAddress = document.getElementById("toilet-address");

// Send POST to API to add the toilets
async function addToilet(e) {
	e.preventDefault();

	if (toiletId.value === "" || toiletAddress.value === "") {
		alert("please fill in fields");
	}

	const sendBody = {
		toiletId: toiletId.value,
		address: toiletAddress.value,
	};

	try {
		const res = await fetch("/api/v1/toilets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(sendBody),
		});
		if (res.status === 400) {
			throw Error("toilet already exist");
		}
		alert("toilet added succesfully");
		window.location.href = "/index.html";
	} catch (error) {
		alert(error);
		return;
	}
}

toiletForm.addEventListener("submit", addToilet);
