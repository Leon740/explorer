// Observer Pattern
// Define a one-to-many relationship so that when the Subject changes,
// all subscribed Observers are notified automatically.

// Domain types: these describe the schedule data, not pattern participants.
type Workday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type Sport = "Swimming" | "Gym";
type ActivityName =
  | "Morning routine"
  | "Learn/Boz"
  | "Learn/Code"
  | "Job"
  | Sport
  | "Book"
  | "Bible"
  | "Analyze&Plan";

interface Activity {
  name: ActivityName;
  duration: {
    from: number;
    to: number;
  };
}

// Notification data passed from the Subject to every Observer.
interface ScheduleUpdate {
  day: Workday;
  activity: Activity;
  currentTime: Date;
}

// Observer contract:
// every subscriber must implement update() to react to Subject changes.
interface ScheduleObserver {
  update(update: ScheduleUpdate): void;
}

// Subject contract:
// defines how Observers subscribe, unsubscribe, and receive notifications.
interface ScheduleSubject {
  subscribe(observer: ScheduleObserver): void;
  unsubscribe(observer: ScheduleObserver): void;
  notifyObservers(update: ScheduleUpdate): void;
}

// Concrete Subject:
// owns the changing schedule state and notifies Observers when it changes.
class WorkdaySchedule implements ScheduleSubject {
  // Collection of currently subscribed Observers.
  private readonly observers = new Set<ScheduleObserver>();

  // Subject state used to determine whether a meaningful change occurred.
  private currentActivity?: Activity;
  private currentDay?: Workday;

  // Attach/register an Observer.
  subscribe(observer: ScheduleObserver): void {
    this.observers.add(observer);
  }

  // Detach/remove an Observer.
  unsubscribe(observer: ScheduleObserver): void {
    this.observers.delete(observer);
  }

  // Notify every subscribed Observer through the Observer contract.
  notifyObservers(update: ScheduleUpdate): void {
    for (const observer of this.observers) {
      observer.update(update);
    }
  }

  private getSportByDay(day: Workday): Sport {
    const sportByDay: Record<Workday, Sport> = {
      Monday: "Swimming",
      Tuesday: "Gym",
      Wednesday: "Swimming",
      Thursday: "Gym",
      Friday: "Swimming",
    };

    return sportByDay[day];
  }

  private getDaySchedule(day: Workday): Activity[] {
    return [
      {
        name: "Morning routine",
        duration: { from: 6, to: 7 },
      },
      {
        name: "Learn/Boz",
        duration: { from: 7, to: 8 },
      },
      {
        name: "Learn/Code",
        duration: { from: 8, to: 12 },
      },
      {
        name: "Job",
        duration: { from: 13, to: 17 },
      },
      {
        name: this.getSportByDay(day),
        duration: { from: 17, to: 20 },
      },
      {
        name: "Book",
        duration: { from: 20, to: 21 },
      },
      {
        name: "Bible",
        duration: { from: 21, to: 22 },
      },
      {
        name: "Analyze&Plan",
        duration: { from: 22, to: 23 },
      },
    ];
  }

  private getCurrentActivity({
    day,
    currentTime,
  }: {
    day: Workday;
    currentTime: Date;
  }): Activity | undefined {
    const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;

    return this.getDaySchedule(day).find(
      ({ duration: { from, to } }) => currentHour >= from && currentHour < to,
    );
  }

  private getWorkday(date: Date): Workday | undefined {
    // Partial is required because 0 (Sunday) and 6 (Saturday) are absent.
    const workdayByNumber: Partial<Record<number, Workday>> = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
    };

    return workdayByNumber[date.getDay()];
  }

  // State-change entry point:
  // calculates the new state and notifies Observers only when it changes.
  updateTime(currentTime: Date): void {
    const day = this.getWorkday(currentTime);
    if (!day) {
      this.currentDay = undefined;
      this.currentActivity = undefined;
      return;
    }

    const activity = this.getCurrentActivity({ day, currentTime });
    if (!activity) return;

    const activityChanged =
      this.currentDay !== day || this.currentActivity?.name !== activity.name;
    if (!activityChanged) return;

    this.currentDay = day;
    this.currentActivity = activity;

    // Publish the state change to all subscribed Observers.
    this.notifyObservers({ day, activity, currentTime });
  }
}

// Concrete Observer:
// implements the Observer contract and chooses how to react to an update.
class ConsoleObserver implements ScheduleObserver {
  update({ day, activity, currentTime }: ScheduleUpdate): void {
    const time = currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log(`${time} - ${day}: ${activity.name}`);
  }
}

// Client:
// creates the Subject and Concrete Observer and connects them together.
const schedule = new WorkdaySchedule();
const consoleObserver = new ConsoleObserver();

// Subscribe/attach the Observer to the Subject.
schedule.subscribe(consoleObserver);

// Mutate/check the Subject state. Each meaningful change triggers update().
schedule.updateTime(new Date());
schedule.updateTime(new Date("2026-07-20T06:00:00"));
schedule.updateTime(new Date("2026-07-20T17:00:00"));
schedule.updateTime(new Date("2026-07-21T17:00:00"));
schedule.updateTime(new Date("2026-07-22T20:00:00"));
schedule.updateTime(new Date("2026-07-24T22:00:00"));

// Optional cleanup: stop receiving future Subject notifications.
schedule.unsubscribe(consoleObserver);
