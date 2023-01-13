import Typography from '@mui/material/Typography';
import Link from 'next/link'

type MenuItemProps = {
    title: string;
    href: string;
}
export const HomeMenuItem = ({title, href}: MenuItemProps) => (
    <Link style={{ textDecoration: 'none' }} href={href}>
        <Typography
            component='h2'
            variant='h4'
            align='center'
        >{title}</Typography>
    </Link>
);