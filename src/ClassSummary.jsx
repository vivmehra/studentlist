import React from 'react';

const ClassSummary = ((props)=>{
                   return( <div>
						<h6 className="font-weight-bold">Class performance</h6>
						<hr/>
						<div className="row">
							<div className="col-md-4">
								<h6>Min Grade</h6>
								<p>{props.data.min}</p>
							</div>
							<div className="col-md-4">
								<h6>Max Grade</h6>
								<p>{props.data.max}</p>
							</div>
							<div className="col-md-4">
								<h6>Average Grade</h6>
								<p>{props.data.avg}</p>
							</div>
						</div>
						<hr/>
					</div>)
});

export default ClassSummary;