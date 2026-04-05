import { useState } from 'react'
import './SearchPost.css'

const SearchPost = () => {

    const [search, setSearch] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = search(title)
            setSearch(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='search-form'>
            <div className='search-input-wrap'>
                <input 
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search...'
                />
            </div>
            <button type='submit'></button>
        </form>
    )
}

export default SearchPost