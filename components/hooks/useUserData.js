import axios from "axios"
import { useState,useEffect } from "react"

export const useUserData = ()=>{
    const [users,setUsers] = useState([])
    const [filteredUsers,setFilteredUsers] = useState([])
    const [searchName,setSearchName] = useState("")
    const [searchEmail,setSearchEmail] = useState("")
    const [sortColumn,setSortColumn] = useState("id")
    const [sortDirection,setSortDirection] = useState("asc")

    const getUsers = async()=>{
        const { data: users } = await axios.get('/api/v1/users')
        setUsers(users)
    }

    useEffect(()=>{
        getUsers()
    },[])

    useEffect(()=>{
        let currentFilter = users.filter(
            user =>
              user.name
                .toLowerCase()
                .includes(searchName.toLowerCase()) &&
              user.email
                .toLowerCase()
                .includes(searchEmail.toLowerCase())
          );
          if(sortColumn){
              currentFilter.sort((a, b) => {
                const x = a[sortColumn];
                const y = b[sortColumn];
                if (x < y) return sortDirection === 'asc' ? -1 : 1;
                if (x > y) return sortDirection === 'asc' ? 1 : -1;
                return 0;
              });
          }
          setFilteredUsers(currentFilter)

    },[users,searchName,searchEmail,sortColumn,sortDirection])

    const handleOnSearch = (event) => {
        let { name, value } = event.target;
  
        if (name === 'name') {
            setSearchName(value)
        } else if (name === 'email') {
            setSearchEmail(value)
        } else {
          throw new Error('Unknown search element');
        }
      };
  
      const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(previous=>previous === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
      };

    return{
        users:filteredUsers,
        sortColumn,
        sortDirection,
        handleOnSearch,
        handleSort
    }
}