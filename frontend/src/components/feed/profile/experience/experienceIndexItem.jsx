import "./experienceIndexItem.css";

export default function ExperienceIndexItem({experience, className}){
  // console.log((experience.endDate));
  const start = new Date(experience.startDate);
  const startMonthInWords = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(start);
  const startYear = start.getFullYear();

  const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };


  let end;
  let endMonthInWords;
  let endYear;
  let diff;

  if (experience.endDate) {
    end = new Date(experience.endDate);
    endMonthInWords = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(end);
    endYear = end.getFullYear();
    diff = monthDiff(start, end);
  }

  // console.log(diff);

  const startDate = `${startMonthInWords} ${startYear}`; 
  const endDate = `${endMonthInWords} ${endYear}`; 


  if (className === "profileExperienceIndexItem") {
    return (
      <div className={className}>
        <p className="profileExperienceTitle">{experience.title}</p>
        <p className="profileExperienceCompanyName">{experience.companyName}</p>

        {(!!experience.endDate === true) &&  
          <p className="profileExperienceDates">
            {`${startDate} to ${endDate} · ${diff} mos`}
          </p> 
        }
        {(!!experience.endDate === false) &&  
          <p className="profileExperienceDates">
            {`${startDate} to ${endDate}`} 
          </p> 
        }


        <hr />
      </div>
    );

  }
}