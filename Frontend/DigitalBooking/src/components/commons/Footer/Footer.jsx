import React from 'react'
import { FaLinkedinIn } from 'react-icons/fa'
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs'
import styles from './/footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.container}>
            <p className={styles.pFooter}>©2023 Digital Booking</p>
            <div className={styles.listFooter}>
                <ul >
                    <li><a href="https://facebook.com"><BsFacebook /></a></li>
                    <li><a href="https://linkedin.com"><FaLinkedinIn /></a></li>
                    <li><a href="https://twitter.com"><BsTwitter /></a></li>
                    <li><a href="https://instagram.com"><BsInstagram /></a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer