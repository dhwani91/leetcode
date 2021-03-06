// Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), determine if a person could attend all meetings.

// For example,
// Given [[0, 30],[5, 10],[15, 20]],
// return false.

// Hide Company Tags Facebook
// Hide Tags Sort
// Hide Similar Problems (H) Merge Intervals (M) Meeting Rooms II


/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {boolean}
 */

 var canAttendMeetings = function(intervals) {
    intervals.sort((a,b) => {
        return a.start > b.start ? 1 : -1;
    });

    console.log("intervals", intervals)
    
    for(var i=1; i < intervals.length; i++) {
        console.log("end", intervals[i-1][1])
        console.log("start",  intervals[i][0])
        if(intervals[i - 1].end > intervals[i].start) {
            return false;
        }
    }
    
    return true;
};

 console.log("result",canAttendMeetings([[1,30], [11,40], [5,10]]))
 console.log("result",canAttendMeetings([[1,3],[5,10], [11,40]]))

