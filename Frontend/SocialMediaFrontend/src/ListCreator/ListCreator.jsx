import InputBox from "../UniversalComponents/InputBox";

export default function ListCreator() {
  return (
    <>
        <div className="list-creator-card">
            <div className="page-header">
                <p>List Creator</p>
            </div>
            <div>
                <InputBox headerName={"List Name"} type={"text"} placeholder={"Click to add text"}/>
                <InputBox headerName={"Description"} type={"text"} placeholder={"Click to add text"}/>
                <InputBox headerName={"List"} type={"text"} placeholder={"*Item 1 \n*Item 2 \n*Item 3"}/>
            </div>
            <button>Create Poll</button>
            <button>Create List</button>
            <button>Share</button>
        </div>
    </>
  )
}

