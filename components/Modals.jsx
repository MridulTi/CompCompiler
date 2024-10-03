import { useError } from "@context/ErrorContext";
import { Button,Input, Card, CardBody, CardFooter, Dialog, Typography, Textarea, Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdError } from "react-icons/md";

export const ErrorModal = ({ message, onClose }) => {
  const router = useRouter()
  const handleGoBack = () => {
    onClose();
    router.push("/")
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-8 lg:max-w-lg lg:mx-16">
        <h2 className="text-lg font-semibold mb-4 text-center">An Error Occurred</h2>
        <p className="mb-6 text-center flex gap-2 justify-center items-center italic w-full"><MdError className='text-3xl text-red-400' />{message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <button
            onClick={handleGoBack}
            className="bg-gray-300 px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export function HostingModal({ open, handleOpen }) {
  const router = useRouter();
  const [Form, setForm] = useState({});
  function handleForm(e) {
    setForm({ ...Form, [e.target.name]: e.target.value });
  }
  function handleCreateComp(){
    console.log(Form)
    axios.post("/api/compete",Form)
    .then(res=>{
      console.log(res);
      router.push(`/code/host-comp/${res.data?.data?.slug}`);
    })
    .catch(err=>console.log(err))
  }

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full p-5 min-w-11/12">
        <CardBody className="flex flex-col gap-6">
          <Typography className="-mt-7 " color="gray" variant="lead">
            Enter Competition Details .
          </Typography>
          <div className="grid gap-4">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Title
            </Typography>
            <Input onChange={handleForm} name="title" label="Title" />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Start Time
            </Typography>
            <Input onChange={handleForm} name="startDate" type="datetime-local" label="Start" />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              End Time
            </Typography>
            <Input onChange={handleForm} name="endDate" type="datetime-local" label="End" />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Description
            </Typography>
            <Textarea onChange={handleForm} name="about" label="Write few lines about the competition" />

            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Tags
            </Typography>
            <Input onChange={handleForm} name="keywords" label="Tags" />
          </div>
        </CardBody>
        <CardFooter className="py-0 flex justify-end w-full gap-4">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={()=>{
            handleOpen;
            handleCreateComp()
          }}>
            Create Comp
          </Button>
        </CardFooter>
      </Card>
    </Dialog>

  )
}

export function AddChallengeModal({ open, handleOpen }) {
  const { challenge} = useError();
  const router = useRouter();
  const [Form, setForm] = useState({"compSlug":challenge.slug});
  function handleForm(e) {
    setForm({ ...Form, [e.target.name]: e.target.value });
  }
  function handleAddChallenge(){
    console.log(challenge.slug)
    axios.post("/api/compete/challenge",Form)
    .then(res=>{
      console.log(res);
      router.push(`/code/host-comp/${challenge.slug}/edit/${res.data?.data?.slug}`);
    })
    .catch(err=>console.log(err))
  }

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full p-5 min-w-11/12">
        <CardBody className="flex flex-col gap-6">
          <Typography className="-mt-7 " color="gray" variant="lead">
            Enter Challenge Details .
          </Typography>
          <div className="grid gap-4">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Challenge Name
            </Typography>
            <Input onChange={handleForm} name="title" label="Name" />
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Difficulty
            </Typography>
            <Select label="Select Difficulty" name="difficulty" onChange={(e)=>setForm({ ...Form, "difficulty":e })}>
              <Option value="easy">Easy</Option>
              <Option value="medium">Medium</Option>
              <Option value="hard">Hard</Option>
            </Select>
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Score
            </Typography>
            <Input type="number" onChange={handleForm} name="score" label="score" />
          </div>
        </CardBody>
        <CardFooter className="py-0 flex justify-end w-full gap-4">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="green" onClick={()=>{
            handleOpen;
            handleAddChallenge()
          }}>
            Add Challenge
          </Button>
        </CardFooter>
      </Card>
    </Dialog>

  )
}