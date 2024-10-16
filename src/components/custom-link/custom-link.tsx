import { Link } from 'react-router-dom';
import s from './custom-link.module.scss'

export const CustomLink = ({ href, text, link }: { href: string, text: string, link: string }) => {
    return (
        <div className={s.wrapper}>
            <p className="text text_type_main-default text_color_inactive">
                {text}
            </p>
            <Link to={href} className={`text text_type_main-default ${s.wrapper__link}`}>
                {link}
            </Link>
        </div>
    );
};
