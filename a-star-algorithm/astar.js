class aStarSearch {
    constructor(start, end, distFxn, heuristicFxn) {
        this.start = start;
        this.end = end;
        // Requirements for this to work: the distance and heuristic functions
        // need to work with two nodes each.
        this.distFxn = distFxn;
        this.heuristicFxn = heuristicFxn;

        this.closedSet = new Set();
        this.openSet = new Set([start]);
        this.pathFound = false;
        this.current = undefined;
    }

    nodeWithMinF(set) {
        var minF = Infinity;
        var minElement = undefined;
        for (let element of set) {
            if (element.f < minF) {
                minElement = element;
                minF = element.f;
            }
        }
        return minElement;
    }

    update() {
        this.current = this.nodeWithMinF(this.openSet);
        if (this.current == end) {
            this.pathFound = true;
        }

        this.openSet.delete(this.current);
        this.closedSet.add(this.current);

        for (let neighbor of this.current.neighbors) {
            if (this.closedSet.has(neighbor)) {
                continue;
            }
            var newPath = false;
            var tempGScore = this.current.g + this.distFxn(this.current, neighbor);
            
            if(this.openSet.has(neighbor)) {
                if (tempGScore < neighbor.g) {
                    neighbor.g = tempGScore;
                    newPath = true;
                }
            } else {
                neighbor.g = tempGScore;
                this.openSet.add(neighbor);
                newPath = true;
            }

            if (newPath) {
                neighbor.h = this.heuristicFxn(neighbor, this.end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = this.current;
            }
        }
    }

    run() {
        while (!this.openSet && !this.pathFound) {
            this.update();
        }
        return this.pathFound;
    }

    path() {
        var path = [];
        var temp = this.current;
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }
        console.log(path);
        return path;
    }
}
