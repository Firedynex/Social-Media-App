import InputBox from "../UniversalComponents/InputBox";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function EventCreator() {
    return (
        <>
            <div className="event-creator-card">

                <div className="page-header">
                    <p>Event Creator</p>
                </div>

                <div className="input-fields">
                    <InputBox headerName={"Organizer Name"} type={"text"} placeholder={"Click to add text"} />
                    <InputBox headerName={"Event Name"} type={"text"} placeholder={"Click to add text"} />
                    <InputBox headerName={"Location"} type={"text"} placeholder={"Click to add text"} />
                </div>

                <div className="short-middle-fields">
                    <InputBox headerName={"Date"} type={"text"} placeholder={"2/6/25"} />
                    <InputBox headerName={"Time"} type={"text"} placeholder={"5:30 PM"} />
                </div>

                <InputBox headerName={"Description"} type={"text"} placeholder={"Click to add text"} />

                <div className="cars-and-reminder">
                    <FormControlLabel required control={<Checkbox />} label="Cars Necessary" />
                    {/*<p> need to figure out how to add tick boxes for number of cars </p>**/}

                    <FormControlLabel required control={<Checkbox />} label="Send Email Reminder" />
                </div>

                <div className="buttons">
                    <div className="first-layer">
                        <button>Create Poll</button>
                        <button>Add to Calendar</button>
                    </div>
                    <div className="second-layer">
                        <button>Create Event</button>
                        <button>Share</button>
                    </div>
                </div>

            </div>
        </>
    )
}
