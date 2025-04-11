
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/current-user";

const ServerPage = async() => {
    const user = await currentUser()
    return ( 
        <div>
            {user && (<UserInfo 
          user={user}
          label=" 💻 Server Component"/>)}
          
        </div>
     );
}
 
export default ServerPage;