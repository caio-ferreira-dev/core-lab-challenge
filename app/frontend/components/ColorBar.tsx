import { useEffect, useRef } from "react"
import styles from "../src/styles/colorbar.module.scss"

type ColorBarProps = {
    setColor: Function
    setState: Function
}

export default function ColorBar({ setColor, setState }: ColorBarProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleOutsideClick(e: React.MouseEvent | MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
              setState(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
    }, [])

    function handleClick(color: string) {
        setColor(color)
    }

    return (
        <div className={styles.colorBarContainer} ref={containerRef}>
            <button className={styles.lightBlue} onClick={() => {handleClick('lightBlue')}}></button>
            <button className={styles.green} onClick={() => {handleClick('green')}}></button>
            <button className={styles.yellow} onClick={() => {handleClick('yellow')}}></button>
            <button className={styles.pink} onClick={() => {handleClick('pink')}}></button>
            <button className={styles.red} onClick={() => {handleClick('red')}}></button>
            <button className={styles.blue} onClick={() => {handleClick('blue')}}></button>
            <button className={styles.purple} onClick={() => {handleClick('purple')}}></button>
            <button className={styles.lime} onClick={() => {handleClick('lime')}}></button>
            <button className={styles.orange} onClick={() => {handleClick('orange')}}></button>
            <button className={styles.gray} onClick={() => {handleClick('gray')}}></button>
            <button className={styles.black} onClick={() => {handleClick('black')}}></button>
            <button className={styles.brown} onClick={() => {handleClick('brown')}}></button>
        </div>
    )
}