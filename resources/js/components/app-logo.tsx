import logoSidebar from '@/images/logo_sidebar.png';

export default function AppLogo() {
    return (
        <>
            {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div> */}
            <div className="ml-1 grid flex-1 text-center text-sm">
                <img src={logoSidebar} alt="Logo" className="mx-auto w-40" />
            </div>
        </>
    );
}
