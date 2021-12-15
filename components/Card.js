import react from "react"
import Image from "next/image"

export default function Card(props) {
    return (
        <div>

            <h3>{props.title}</h3>
            {props.image && <Image src={props.image} alt="" width="100%" height="100%" />}
            <p>{props.desc}</p>
            <h4>{props.price} €</h4>
        </div>
    )
}