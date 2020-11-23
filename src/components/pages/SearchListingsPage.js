import React, { useState, useEffect } from "react";

import SearchListingsList from "../search/SearchListingsList";
import SearchFilter from "../search/SearchFilter";
import { getAllListings } from "../../firebase/Client";
import { getCityName } from "../../gmaps/geocode";
import { filterByDistance, filterByTags } from "../search/filterFunctions";

const SearchListingsPage = () => {
    const [allListings, setAllListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState(null);
    const [filterMessage, setFilterMessage] = useState("Showing all listings");
    const [skillFilterMessage, setSkillFilterMessage] = useState("");

    useEffect(() => {
        const filterUID = false;
        const active = true;
        getAllListings(filterUID, active).then((list) => {
            console.log(list);
            setAllListings(list);
            setFilteredListings(list);
        });
    }, []);

    const handleFilters = (filters) => {
        var filtered = allListings;
        if (filters.location.length > 0) {
            getCityName(filters.location[0], filters.location[1]).then((city) => {
                setFilterMessage(`Showing relevant listings within ${filters.distance} miles of ${city}.`);
            });
            filtered = filterByDistance(allListings, filters.distance, filters.location);
        }
        if (filters.skilltags.length > 0) {
            if (filters.location.length > 0) {
                filtered = filterByTags(filtered, filters.skilltags);
            } else {
                filtered = filterByTags(allListings, filters.skilltags);
            }
            setSkillFilterMessage(`Skill Tag Filters: ${filters.skilltags.join(", ")}`);
        } else {
            setSkillFilterMessage("");
        }
        setFilteredListings(filtered);
    }

    const handleClearFilters = () => {
        setFilteredListings(allListings);
        setFilterMessage("Showing all Listings")
        setSkillFilterMessage("");
    }

    return (
        <div className="search-page">
            <SearchFilter handleFilters={handleFilters} handleClearFilters={handleClearFilters} />
            <SearchListingsList listings={filteredListings} filterMessage={filterMessage} skillFilterMessage={skillFilterMessage} />
        </div>
    );
}

export default SearchListingsPage;