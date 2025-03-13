"use client";

import { Preference } from "@/dtos/preference.dot";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function seek(){
    const [preference, setPref] = useState<Preference>({});
    const router = useRouter();
    
    const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPref((prevData) => {
            const key = e.target.name as keyof Preference;
            const prevValue = prevData[key];

            if (e.target.type === "checkbox") {
                if(Array.isArray(prevValue)){
                    return {
                        ...prevData,
                        [key]: e.target.checked 
                            ? [...prevValue, e.target.value]
                            : prevValue.filter(pref => pref !== e.target.value)
                    };
                }else{
                    return {
                        ...prevData,
                        [key]: e.target.checked ? [e.target.value] : []
                    }
                }
            } else {
                return {
                    ...prevData,
                    [key]: e.target.value
                };
            }
        });
    }

    const submitHandle = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const responce = await fetch('api/find-restaurent', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(preference),
            });

            if(responce.ok){
                const data = await responce.json();
                console.log(data.token);
                
                router.replace(`/result/${data.token}`)
            }else{
                console.error("API request failed.");
            }
        }catch (err){
            console.error("Error submitting form:", err);
        }
    }

    return (
        <>
            <form onSubmit={submitHandle}>
                <fieldset>
                    <legend>Any dietary restrictions?</legend>
                    
                    <input type="checkbox" className="option" name="dite" value="vegan" onChange={changeHandler}/>
                    <label htmlFor="vegan">Vegan</label>
                    <br />
                    <input type="checkbox" className="option" name="dite" value="vegetarian" onChange={changeHandler}/>
                    <label htmlFor="vegetarian">Vegetarian</label>
                    <br />
                    <input type="checkbox" className="option" name="dite" value="gluten_free" onChange={changeHandler}/>
                    <label htmlFor="gluten_free">Gluten Free</label>
                </fieldset>
                
                <fieldset>
                    <legend>Please select your cuisine preferences?</legend>
                    
                    <input type="checkbox" className="option" name="cuisine" value="korean" onChange={changeHandler}/>
                    <label htmlFor="korean">Korean</label>
                    <br />
                    <input type="checkbox" className="option" name="cuisine" value="japanese" onChange={changeHandler}/>
                    <label htmlFor="japanese">Japanese</label>
                    <br />
                    <input type="checkbox" className="option" name="cuisine" value="chinese" onChange={changeHandler}/>
                    <label htmlFor="chinese">Chinese</label>
                    <br />
                    <input type="checkbox" className="option" name="cuisine" value="mexican" onChange={changeHandler}/>
                    <label htmlFor="mexican">Mexican</label>
                    <br />
                    <input type="checkbox" className="option" name="cuisine" value="Italian" onChange={changeHandler}/>
                    <label htmlFor="Italian">Italian</label>
                    <br />
                    <input type="checkbox" className="option" name="cuisine" value="middle_eastern" onChange={changeHandler}/>
                    <label htmlFor="middle_east">Middle Eastern</label>
                    <br />
                    <input type="checkbox" className="option" name="cuisine" value="Random" onChange={changeHandler}/>
                    <label htmlFor="Random">Random</label>

                </fieldset>

                <fieldset>
                    <legend>What's your budget range? (Per person if group)</legend>

                    <input type="radio" className="option" name="price" value="below 10" onChange={changeHandler}/>
                    <label htmlFor="below 10">$ (Below 10$)</label>
                    <br />
                    <input type="radio" className="option" name="price" value="10-20" onChange={changeHandler}/>
                    <label htmlFor="10-20">$$ (Between 10$ to 20$)</label>
                    <br />
                    <input type="radio" className="option" name="price" value="20-30" onChange={changeHandler}/>
                    <label htmlFor="20-30">$$$ (Between 20$ to 30$)</label>
                    <br />
                    <input type="radio" className="option" name="price" value="30-50" onChange={changeHandler}/>
                    <label htmlFor="30-50">$$$$ (Between 30$ to 50$)</label>
                    <br />
                    <input type="radio" className="option" name="price" value="50+" onChange={changeHandler}/>
                    <label htmlFor="50+">$$$$$ (50$ and Above)</label>
                </fieldset>

                <fieldset>
                    <legend>Do you prefer a sit-down restaurant, fast food, or takeout?</legend>

                    <input type="radio" className="option" name="style" value="sit-down" onChange={changeHandler}/>
                    <label htmlFor="sit-down">Sit-Down Restaurant</label>
                    <br />
                    <input type="radio" className="option" name="style" value="fast-food" onChange={changeHandler}/>
                    <label htmlFor="fast-food">Fast Food</label>
                    <br />
                    <input type="radio" className="option" name="style" value="takeout" onChange={changeHandler}/>
                    <label htmlFor="takeout">Takeout</label> 
                </fieldset>

                <fieldset>
                    <legend>How far are you willing to travel?</legend>

                    <input type="radio" className="option" name="travel" value="walking-distance" onChange={changeHandler}/>
                    <label htmlFor="walking-distance">Walking distance</label>
                    <br />
                    <input type="radio" className="option" name="travel" value="short-drive" onChange={changeHandler}/>
                    <label htmlFor="short-drive">Short Drive</label>
                    <br />
                    <input type="radio" className="option" name="travel" value="anything" onChange={changeHandler}/>
                    <label htmlFor="anything">Doesn't Matter</label> 
                    <br />
                    <label htmlFor="location">Where do you live?</label> 
                    <input type="input" className="travel" name="location" onChange={changeHandler}/>
                </fieldset>

                <fieldset>
                    <legend>Do you want a place that serves alcohol/cocktails?</legend>
                    <input type="radio" className="option" name="drinks" value="yes" onChange={changeHandler}/>
                    <label htmlFor="yes">Yes</label> 
                    <br />
                    <input type="radio" className="option" name="drinks" value="no" onChange={changeHandler}/>
                    <label htmlFor="no">No</label> 
                </fieldset>

                <fieldset>
                    <legend>If you care, what kind of ambiance do you want? (Skip if you'r okay with anything.)</legend>
                    <input type="checkbox" className="option" name="ambiance" value="outdoor_seating" onChange={changeHandler}/>
                    <label htmlFor="outdoor_seating">Outdoor Seating</label>
                    <br />
                    <input type="checkbox" className="option" name="ambiance" value="scenic_view" onChange={changeHandler}/>
                    <label htmlFor="scenic_view">Scenic View</label>
                    <br />
                    <input type="checkbox" className="option" name="ambiance" value="unique_ambiance" onChange={changeHandler}/>
                    <label htmlFor="unique_ambiance">Unique Ambiance</label>
                </fieldset>


                <button type="submit">Submit</button>
            </form>
        </>
    );
}