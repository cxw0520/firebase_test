import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";


function Header(){
    return (
        
        <Menu>
            <Menu.Item as={Link} to="/">
                AR Classroom
            </Menu.Item>
            <Menu.Item>
                <Search/>
            </Menu.Item>
            
            <Menu.Menu position="right">
                <Menu.Item as={Link} to ="/draw">畫板</Menu.Item>
                <Menu.Item as={Link} to ="/new-post">發表文章</Menu.Item>
                <Menu.Item as={Link} to ="/signin">註冊/登入</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
    
}

export default Header;