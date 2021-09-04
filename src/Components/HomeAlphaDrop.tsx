import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

interface DDMenuItems {
    dropDownTitle: string,
    menuTitle: string,
    menuPages: string[],
    handleSelect:Function
}

const AlphaDrop = ({dropDownTitle, menuTitle, menuPages, handleSelect }: DDMenuItems) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    // const handleSelect = (e:any)=> {
    //     console.log(e.target.value)
    //     let newVal = e.target.value
    //     setDropdownName(newVal)
    //  }

    return (
            <Dropdown className='mt-5'  isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color='prim' className='randoButt alphaDrop' caret>
                    {dropDownTitle}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>{menuTitle}</DropdownItem>
                    {
                        menuPages.map(menuCat => (
                            <DropdownItem onClick={()=>{handleSelect(menuCat)}} value={menuCat}> {menuCat} </DropdownItem>
                            ))
                        }
                   
                </DropdownMenu>
            </Dropdown>
    );
}

export default AlphaDrop;