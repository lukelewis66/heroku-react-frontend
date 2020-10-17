import React from "react";

import ReviewItem from "./ReviewItem";

const ReviewList = () => {
    const fakeReviewItems = [
        { id: 1, rating: "rating 1", comment: "comment 1", reviewImage: "reviewImage 1" },
        { id: 2, rating: "rating 2", comment: "comment 2", reviewImage: "reviewImage 2" },
        { id: 3, rating: "rating 3", comment: "comment 3", reviewImage: "reviewImage 3" },
        { id: 4, rating: "rating 4", comment: "comment 4", reviewImage: "reviewImage 4" },
    ];

    return (
        <div className="component-border">
            <h1>ReviewList component</h1>
            <div className="flex-list">
                {fakeReviewItems.map((item) => (
                    <ReviewItem key={item.id} props={item} />
                ))}
            </div>
        </div>
    );
}

export default ReviewList;