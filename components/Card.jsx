import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { LucideClockAlert } from "lucide-react";
import Link from "next/link";

export function CardWithLink(props) {
    return (
        <Card className="mt-6 w-96 h-fit dark:bg-gray-900 dark:text-gray-200">
            <CardBody>
               {props?.icon}
                <Typography variant="h5" className="mb-2 text-green-600 dark:text-green-400">
                    {props?.title}
                </Typography>
                <Typography variant="p" className="text-sm dark:text-gray-500 pb-4 font-semibold">
                    {props?.tagline} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil at debitis quo saepe autem non ex 
                </Typography>
                <Typography variant="p">
                    {props?.about} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id pariatur odio tempore, dolorum ratione quaerat possimus! Corporis officiis maiores beatae! Eligendi modi consequuntur rem deleniti dolorem quibusdam iste nihil dolorum.
                </Typography>
                <Typography variant="p" className="text-sm dark:text-gray-500">
                    {props?.startDate}
                </Typography>
                {props?.keywords?.map(data=>(
                    <Typography variant="p" className="text-sm dark:text-gray-500">
                    {data}
                </Typography>
                ))}
            </CardBody>
            <CardFooter className="pt-0">
                    <Link href={`/code/participate/${props.slug}`}><Button size="sm" variant="text" className="flex items-center bg-gray-200 dark:bg-gray-800 gap-2 dark:text-gray-300">
                       <LucideClockAlert/> Take Part
                    </Button>
                    </Link>
            </CardFooter>
        </Card>
    );
}