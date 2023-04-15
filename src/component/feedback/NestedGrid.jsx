import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { array } from "yup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FormRow({ technologyList, setTechnologyList, isSoftskill, handleSoftSkillRatingsChange, setValue , handleTechRatingsChange}) {
  const [skillRatings, setSkillRatings] = useState([]);
  const [techStackRating, setTechStackRating] = useState([])
  const [techSkills, setTechSkills] = useState([]);

  // Initialize the softSkillRatings array with default values
  useEffect(() => {
    const defaultRatings = technologyList && Array.isArray(technologyList) && technologyList.map((skill) => ({
      skillName: skill.skillName,
      rating: 0,
    }));
    setSkillRatings(defaultRatings);


  }, [technologyList]);


  const renderSkill = (skill) => {
    return (
      <Grid item xs={4}>
        <Item>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>{skill.skillName}</Grid>
            <Grid item>
              <FormControl
                sx={{ maxWidth: 75 }}
                size="small"
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">/ 5</InputAdornment>
                  }
                  onChange={(e) => {
                    if (isSoftskill) handleSoftSKillRatingChange(e, skill);
                    else handleRatingChange(e, skill);
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    );
  };

  const handleSoftSKillRatingChange = (e, skill) => {

    const ratings = Array.isArray(technologyList) && technologyList.map((eg) => {
      if (eg.skillName === skill.skillName) {
        console.log("SOFT ==== ", eg);
        return { ...eg, rating: e.target.value }
      }
      else {
        // Preserve the previous rating for skills that don't match
        const existingSkillRating = skillRatings.find((r) => r.skillName === eg.skillName);
        return existingSkillRating || eg;
      }
    });
    console.log("RATING => ", ratings)
    setSkillRatings(ratings)
    console.log("SOFT_SKILL_RATING => ", skillRatings)
    handleSoftSkillRatingsChange(ratings);
    setValue('softSkillRatings', ratings)
  }

const handleRatingChange = (e, skill) => {
    console.log("SKILL := ", skill, "+::+", "TECHNOLOGY ==", technologyList)

    const ratings = technologyList && Array.isArray(technologyList) && technologyList.map((eg) => {
        const tech = eg.techSkills && Array.isArray(eg.techSkills) && eg.techSkills.map((techskill) => {
            if (techskill.skillName === skill.skillName) {
                // Update the current rating for the matching skill
                return { ...techskill, rating: e.target.value };
            } else {
                // Preserve the previous rating for skills that don't match
                const existingSkillRating = techSkills.find((r) => r.skillName === techskill.skillName);
                return existingSkillRating ? { ...existingSkillRating, rating: 0 } : techskill;
            }
        });
        return { ...eg, techSkills: tech }; // Return the updated techSkills for the current employee
    });
    
    console.log("RATING => ", ratings);
    setTechStackRating(ratings);
    console.log("SKILL_RATING :: ", techStackRating)
    setTechnologyList(ratings); // Update the technologyList state with the updated ratings
    console.log("TECHNO_LIST :: ", technologyList)
    handleTechRatingsChange(technologyList);
    setValue('technologyRating', technologyList)
};



  // const handleRatingChange = (e, skill) => {

  //   console.log("SKILL := ", skill, "+::+", "TECHNOLOGY ==", technologyList)

  //   const ratings = technologyList && Array.isArray(technologyList) && technologyList.map((eg) => {
  //     // console.log("EGGG :=  ", eg.skillName)
  //     const tech = eg.techSkills && Array.isArray(eg.techSkills) && eg.techSkills.map((techskill) => {
  //       if (techskill.skillName === skill.skillName) {
  //           return { ...techskill, rating: e.target.value };
  //       } else {
  //           // Preserve the previous rating for skills that don't match
  //           const existingSkillRating = techSkills.find((r) => r.skillName === techskill.skillName);
  //           return existingSkillRating ? { ...existingSkillRating } : techskill;
  //       }
  //   });
    
  //   console.log("RATING => ", tech);
    
      
  //   });
  //   // console.log("RATING => ", ratings)
  //   // setSkillRatings(ratings)
  //   // console.log("SOFT_SKILL_RATING => ", skillRatings)
  //   // handleSoftSkillRatingsChange(ratings);
  //   // setValue('softSkillRatings', ratings)

  // };
  return (
    <React.Fragment>
      {isSoftskill && technologyList && Array.isArray(technologyList) &&
        technologyList.map((skill) => renderSkill(skill))}

      {technologyList && Array.isArray(technologyList) && technologyList
        .filter((t) => t.isSelected)
        .map((tech) => tech.techSkills.map((skill) => renderSkill(skill)))}
    </React.Fragment>
  );
}

export default function NestedGrid({
  technologyList,
  setTechnologyList, setValue,
  isSoftskill, handleSoftSkillRatingsChange, handleTechRatingsChange
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow setValue={setValue}
            technologyList={technologyList}
            setTechnologyList={setTechnologyList}
            isSoftskill={isSoftskill}
            handleSoftSkillRatingsChange={handleSoftSkillRatingsChange}
            handleTechRatingsChange={handleTechRatingsChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
