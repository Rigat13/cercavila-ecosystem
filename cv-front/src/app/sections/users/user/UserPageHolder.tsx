import {UserPage} from "@/app/sections/users/user/UserPage";
import {useUsersContext} from "@/app/sections/users/UsersContext";
import {CCGMPage} from "@/app/sections/users/user/CCGMPage";

export function UserPageHolder({userId, lang}: {userId: string; lang: string}) {
    const { users } = useUsersContext();
    const user = users.find((user) => user.id === userId);
    return (
        <section>
            {user && (<UserPage user={user} lang={lang}/>)}
        </section>
    )
}