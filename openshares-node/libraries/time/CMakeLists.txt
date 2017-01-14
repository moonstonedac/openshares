file(GLOB HEADERS "include/capricorn/time/*.hpp")

add_library( capricorn_time
             time.cpp
           )

target_link_libraries( capricorn_time fc )
target_include_directories( capricorn_time
                            PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include" )

install( TARGETS
   capricorn_time

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
install( FILES ${HEADERS} DESTINATION "include/capricorn/time" )
