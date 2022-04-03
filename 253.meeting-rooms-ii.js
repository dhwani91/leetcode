/* Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

Example 1:

Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Example 2:

Input: [[7,10],[2,4]]
Output: 1

*/


/* Analysis
Greedy & Priority Queue

To arrange meetings, we can't arrange them in any random order. In common sense, we arrange them in increasing order of start time. Because we should allocate a room to a meeting in the 9:00am in the morning before we worry about the meeting starts at 5pm in the afternoon right?

So we iterate thru the meeting, for current one, we check if there's available room. But how do we check it efficiently. If we check one by one, in the worse case, where all meetings collide with each other and we have to assign a new room to each one, it's gonna take O(n) in average just to check available room. Then total time would be O(n^2).

However, we can put our existing rooms in a priority queue where the key is the end time. So every time we get the topmost room in the priority queue, we get the one that ends the earliest. That means, if this room is not available, no other room is. Each time it takes O(logn) to get the min value, so total time would be O(nlogn).
*/

class MinHeap {
    constructor() {
        this.storage =[];
        this.size=0
    }

    getParentIndex(index){
        return Math.floor((index-1)/2)

    }
     getLeftChildIndex(index){
        return 2 * index + 1;
     }

     getRightChildIndex(index){
        return 2 * index + 2;
     }
     hasParentIndex(index){
        return this.getParentIndex(index) >0

     }
    hasLeftIndex(index){
        return this.getLeftChildIndex(index) < this.size
    }
    hasRightIndex(index){
        return this.getRightChildIndex(index) < this.size
    }

    parent(index){
        return this.storage[this.getParentIndex(index)]

    }

    leftChild(index){
        return this.storage[this.getLeftChildIndex(index)]

    }

    rightChild(index){
        return this.storage[this.getRightChildIndex(index)]
    }

    swap(index1, index2){
        const temp = this.storage[index1];
        this.storage[index1] = this.storage[index2]
        this.storage[index2] = temp;
    }

    heapifyUp(index){
        if(this.hasParentIndex(index) && this.parent(index) > this.storage[index]){
            this.swap(this.getParentIndex(index) , index)
            index = this.getParentIndex(index)
        }
    }

    heapifyDown(index){

        if(this.hasLeftIndex(index)){
            let smallestChildIndex = this.getLeftChildIndex(index);
            if(this.hasRightIndex(index) && this.getRightChildIndex(index) < this.getLeftChildIndex(index)){
                smallestChildIndex = this.getRightChildIndex(index)
            }
            if(this.storage[index] < this.storage[smallestChildIndex]){
                break;
            }else{
                this.swap(index, smallestChildIndex)
                index = smallestChildIndex;
            }
        }

    }

    insert(data){
          // insert data at the last position
          this.storage[this.size]= data;
          // increment the size
          this.size +=1;
          this.heapifyUp(this.size-1)

    }
    remove(){
        if(this.size == 0){
            throw  new Error(" empty Heap")
        }
        // get the first element
        let data = this.storage[0];
        // swap with last element
        this.storage[0] = this.storage[this.size -1];
        this.size -=1;
        this.heapifyDown(0)
        return data;

    }

    peek(){
        this.size > 0 ? this.storage[0] : null
    }
}

var minMeetingRooms = function(intervals) {
    intervals.sort((a, b) => a.start - b.start);
    const rooms = new MinHeap();

    for (let meeting of intervals) {
        // check if min end times of meetings is less than currenrt meeting's start time    
        if(rooms.size > 0 && rooms.peek() <= meeting.start){
            rooms.remove()
        }else{
            rooms.insert(meeting.end);
        }
    }
    return rooms.size;
}